<?php

namespace App\Services;

use App\Exceptions\Api\Orders\CreateOrderException;
use App\Models\Address;
use App\Models\Client;
use App\Models\Lib\Currency;
use App\Models\Lib\PaymentType;
use App\Models\Order;
use App\Models\PizzaVariant;
use Illuminate\Support\Facades\DB;

class OrderService
{
    protected $order;
    protected $cart;
    protected $variantsLoaded = false;
    protected $variants;

    public function __construct(?Order $order)
    {
        if (empty($order)) {
            $order = new Order();
        }

        $this->cart = $this->variants = collect([]);
        $this->order = $order;
    }

    public function setClient(Client $client)
    {
        $this->order->client()->associate($client);
        return $this;
    }

    public function setAddress(Address $address)
    {
        $this->order->address()->associate($address);
        return $this;
    }

    public function setPaymentType(PaymentType $paymentType)
    {
        $this->order->paymentType()->associate($paymentType);

        $this->order->status = $paymentType->is_external
            ? Order::STATUS_WAIT_PAYMENT
            : Order::STATUS_IN_PROGRESS;

        return $this;
    }

    public function setCurrency(Currency $currency)
    {
        $this->order->currency()->associate($currency);
        return $this;
    }

    public function setCart(array $cart)
    {
        $this->cart = collect($cart)->keyBy('id');
    }

    /**
     * @param null|float $checkPrice
     * @param null|string $currencyCode
     * @return float|int
     * @throws CreateOrderException
     */
    public function getPrice(?float $checkPrice = null, ?string $currencyCode = null)
    {
        $this->loadVariants();
        if (!$currencyCode) {
            $currencyCode = $this->order->currency->code;
        }

        if (!$this->cart || !$this->variants) {
            throw new CreateOrderException('Not set cart or pizza_variants');
        }

        $price = 0;

        foreach ($this->variants as $variant) {
            $priceOne = $variant->prices[$currencyCode]['value'];
            $amount = $this->cart[$variant->id]['count'];
            $price += $priceOne * $amount;
        }



        if ($checkPrice && ($price > $checkPrice)) {
            throw new CreateOrderException('Wrong price');
        }

        return $price;
    }

    /**
     * @return Order|null
     * @throws CreateOrderException
     */
    public function createOrder()
    {
        DB::beginTransaction();
        try {
            $this->order->price = $this->getPrice();
            $this->order->save();

            $items = [];

            foreach ($this->variants as $variant) {
                $items[] = [
                    'variant_id' => $variant->id,
                    'counts' => $this->cart[$variant->id]['count'],
                ];
            }
            if (count($items) === 0) {
                throw new \Exception('Empty items');
            }
            $this->order->items()->createMany($items);
            $this->order->save();
            $this->order->load([
                'items'
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw new CreateOrderException(
                'Error create order',
                0 ,
                $e
            );
        }

        return $this->order;
    }

    protected function loadVariants()
    {
        if ($this->variantsLoaded) { return true; }

        if ($this->cart->count() > 0) {
            $variantIds = $this->cart->pluck('id');
            $this->variants = PizzaVariant::whereIn('id', $variantIds)
                ->get();
        }

        $this->variantsLoaded = $this->variants->count() > 0;
    }
}