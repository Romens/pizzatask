<?php

use App\Models\Ingredient;
use App\Models\Lib\Crust;
use App\Models\Lib\Size;
use App\Models\Pizza;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;

class PizzasSeeder extends Seeder
{

    /** @var Ingredient[]|Collection $ingredients */
    public $ingredients;
    /** @var Size[]|Collection $sizes */
    public $sizes;
    /** @var Crust[]|Collection $crusts */
    public $crusts;

    public $data = [
        ['image' => '1.jpg', 'price' => 20, 'title' => 'Adelaida', 'ingredients' => 2, ],
        ['image' => '2.jpg', 'price' => 30, 'title' => 'Pandora', 'ingredients' => 4, ],
        ['image' => '3.png', 'price' => 20, 'title' => 'Gudron', 'ingredients' => 2, ],
        ['image' => '4.png', 'price' => 24, 'title' => 'Russell\'s Crust', 'ingredients' => 3, ],
        ['image' => '5.jpg', 'price' => 30, 'title' => 'Corona', 'ingredients' => 4, ],
        ['image' => '6.png', 'price' => 30, 'title' => 'Margosha', 'ingredients' => 4, ],
        ['image' => '7.jpg', 'price' => 30, 'title' => 'Ramsey', 'ingredients' => 4, ],
        ['image' => '8.jpg', 'price' => 40, 'title' => 'Bohemian', 'ingredients' => 5, ],
        ['image' => '9.jpg', 'price' => 40, 'title' => 'Rhapsody', 'ingredients' => 5, ],
    ];

    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->ingredients = Ingredient::all();
        $this->sizes = Size::all();
        $this->crusts = Crust::all();

        foreach ($this->data as $item)
        {
            $this->genOnePizza($item);
        }

    }

    public function genOnePizza(array $item)
    {
        $pizzaIngredients = $this->ingredients->random($item['ingredients']);
        unset($item['ingredients']);

        $pizza = new Pizza($item);
        $pizza->save();
        $pizza->ingredients()->attach($pizzaIngredients);
        $pizza->sizes()->attach($this->sizes);
        $pizza->crusts()->attach($this->crusts);
        $pizza->save();
    }
}
