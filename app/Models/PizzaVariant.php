<?php

namespace App\Models;

use App\Models\Lib\Currency;
use Illuminate\Database\Eloquent\Model;

class PizzaVariant extends Model
{

    protected $appends = [
        'prices',
    ];

    protected $hidden = [
        'price',
    ];

    public function pizza()
    {
        return $this->belongsTo(Pizza::class);
    }

    public function getPricesAttribute()
    {
        $prices = [];
        $currencies = config('currencies.available');
        $currenciesData = Currency::allWithCache(60);

        foreach ($currencies as $code => $symbol)
        {
            $currency = $currenciesData->where('code', $code)->first();

            $price = $this->attributes['price'];

            if (!$currency->is_default)
            {
                if (config('currencies.round_convert_price'))
                {
                    $price *= round(
                        $currency->value,
                        config('currencies.round_convert_precision')
                    );

                } else {
                    $price *= $currency->value;
                }
            }

            $prices[$code] = [
                'value' => round($price, 2),
                'symbol' => $symbol,
            ];
        }

        return $prices;
    }

}
