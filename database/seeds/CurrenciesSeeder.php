<?php

use App\Jobs\UpdateCurrencies;
use Illuminate\Database\Seeder;

class CurrenciesSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        dispatch_now(new UpdateCurrencies());
    }
}
