<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(SizesSeeder::class);
        $this->call(CrustsSeeder::class);
        $this->call(IngredientsSeeder::class);
        $this->call(PizzasSeeder::class);
        $this->call(PizzaVariantsSeeder::class);
        $this->call(CurrenciesSeeder::class);

    }
}
