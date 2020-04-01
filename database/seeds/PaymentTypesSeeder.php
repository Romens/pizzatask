<?php

use App\Models\Lib\PaymentType;
use Illuminate\Database\Seeder;

class PaymentTypesSeeder extends Seeder
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
            PaymentType::create($item);
        }
    }

    public $data = [
        ['title' => 'Cash to the courier', 'code' => 'cash'],
        ['title' => 'Payment by card to the courier.', 'code' => 'card'],
    ];
}
