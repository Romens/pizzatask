<?php

namespace App\Http\Controllers\Api;


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
        ]);
    }
}
