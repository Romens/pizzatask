<?php

namespace App\Http\Controllers\Api;


use App\Exceptions\Api\Orders\CreateOrderException;
use App\Http\Requests\Api\CreateOrderRequest;
use App\Services\OrderService;

class OrdersController extends BaseApiController
{
    /**
     * @param CreateOrderRequest $request
     * @param OrderService $orderService
     * @return \Illuminate\Http\JsonResponse
     * @throws CreateOrderException
     */
    public function create(CreateOrderRequest $request, OrderService $orderService)
    {
        $client = $request->getClient();
        $currency = $request->getCurrency();

        $orderService
            ->setClient($request->getClient())
            ->setPaymentType($request->getPaymentType())
            ->setAddress($request->getAddress($client))
            ->setCurrency($request->getCurrency())
            ->setCart($request->cart);

        $orderService->getPrice($request->price, $currency->code);

        $order = $orderService->createOrder();

        return $this->response([
            'order' => $order
        ]);
    }
}
