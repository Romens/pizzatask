<?php

use App\Models\Ingredient;
use App\Models\Lib\Crust;
use App\Models\Lib\Size;
use App\Models\Pizza;
use App\Models\PizzaVariant;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;

class PizzaVariantsSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $pizzas = Pizza::withIngredients()
            ->withSizes()
            ->withCrusts()
            ->get();


        foreach ($pizzas as $pizza)
        {
            foreach ($pizza->sizes as $size)
            {
                foreach ($pizza->crusts as $crust)
                {
                    $price = $crust->price
                        + $size->default_price
                        + $pizza->price;

                    $price += rand(0,5);

                    PizzaVariant::create([
                        'size_id' => $size->id,
                        'crust_id' => $crust->id,
                        'pizza_id' => $pizza->id,
                        'price' => $price,
                    ]);
                }
            }
        }
    }
}
