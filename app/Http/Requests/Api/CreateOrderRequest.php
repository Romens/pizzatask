<?php

namespace App\Http\Requests\Api;

use App\Models\Address;
use App\Models\Client;
use App\Models\Lib\Currency;
use App\Models\Lib\PaymentType;
use Illuminate\Foundation\Http\FormRequest;

/**
 *
 * @property-read $cart
 * @property-read $price
 * @property-read $comment
 * @property-read $address
 * @property-read $zip_code
 * @property-read $remember
 * @property-read $phone
 * @property-read $currency
 * @property-read $name
 * @property-read $payment_type_id
 *
 */
class CreateOrderRequest extends FormRequest
{

    public function cartPrice()
    {
        return collect($this->cart)
            ->sum(function ($item) {
                return $item['count'] * $item['prices'][$this->currency];
            });
    }

    public function getClient(): Client
    {
        return Client::getClient(
            $this->phone,
            $this->name
        );
    }

    public function getPaymentType(): PaymentType
    {
        return PaymentType::find($this->payment_type_id);
    }

    public function getCurrency(): Currency
    {
        return Currency::whereCode($this->currency)->first();
    }

    public function getAddress($client): Address
    {
        return Address::getAddress(
            $client,
            $this->address,
            $this->zip_code
        );
    }

    public function rules()
    {
        return [
            'cart' => 'array',
            'cart.*.id' => 'distinct|integer|min:1|required',
            'cart.*.count' => 'integer|min:1|required',
            'price' => 'numeric|min:1|required',
            'comment' => 'string|nullable',
            'address' => 'string|required',
            'zip_code' => 'numeric|nullable',
            'remember' => 'string|nullable',
            'phone' => 'string|required',
            'name' => 'string|required',
            'currency' => 'string|required',
            'payment_type_id' => 'integer|required',
        ];
    }
}
