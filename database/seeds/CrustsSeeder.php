<?php

use App\Models\Lib\Crust;
use Illuminate\Database\Seeder;

class CrustsSeeder extends Seeder
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
            Crust::create($item);
        }
    }

    public $data = [
        ['title' => 'Thin', 'price' => 0.00],
        ['title' => 'Traditional', 'price' => 0.00],
//        ['title' => 'Sausage', 'price' => 5.00],
//        ['title' => 'Cheese', 'price' => 4.00],
    ];
}
