<?php

use App\Models\Lib\Size;
use Illuminate\Database\Seeder;

class SizesSeeder extends Seeder
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
            Size::create($item);
        }
    }


    public $data = [
        ['title' => '20', 'persons' => '1', 'default_price' => 2.12],
        ['title' => '30', 'persons' => '2', 'default_price' => 4.15],
        ['title' => '40', 'persons' => '4', 'default_price' => 6.30],
        ['title' => '60', 'persons' => '5+', 'default_price' => 9.50],
    ];
}
