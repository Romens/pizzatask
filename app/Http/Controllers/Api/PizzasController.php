<?php

namespace App\Http\Controllers\Api;


use App\Models\Lib\Crust;
use App\Models\Lib\PaymentType;
use App\Models\Lib\Size;
use App\Models\Pizza;

class PizzasController extends BaseApiController
{
    public function index()
    {
        $pizzas = Pizza::onlyActive()
            ->withIngredients()
            ->withSizes()
            ->withCrusts()
            ->withVariants()
            ->get();

        return $this->response([
            'pizzas' => $pizzas,
            'crusts' => Crust::allWithCache()->keyBy('id'),
            'sizes' => Size::allWithCache()->keyBy('id'),
            'payment_types' => PaymentType::allWithCache(),
        ]);
    }
}
