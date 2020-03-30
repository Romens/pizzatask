<?php

use App\Models\Ingredient;
use Illuminate\Database\Seeder;

class IngredientsSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->data as $item)
        {
            Ingredient::create($item);
        }
    }

    public $data = [
        ['title' => 'Cheese Mozzarella'],
        ['title' => 'Cheese Reggianito'],
        ['title' => 'Cheese Cheddar'],
        ['title' => 'Cheese Parmigiano'],
        ['title' => 'Pepperoni'],
        ['title' => 'Chicken BBQ'],
        ['title' => 'Mushrooms'],
        ['title' => 'Tomatoes'],
        ['title' => 'Beef'],
    ];
}
