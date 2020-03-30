<?php

namespace App\Services;


use App\Models\Lib\Currency;

class CBRService
{
    private $url = 'https://www.cbr-xml-daily.ru/daily_json.js';

    const apiCode = 'RUR';

    public $data = [];
    public $loaded = false;

    public function load()
    {
        if (!$this->loaded) {
            $jsonData = file_get_contents($this->url);
            $this->data = json_decode($jsonData, true);
            $this->loaded = (json_last_error() === JSON_ERROR_NONE);
        }
    }

    public function getCurrency($code = 'USD')
    {
        return (float) $this->data['Valute'][$code]['Value'] ?? 0;
    }

    public function getDefaultCurrency()
    {
        return $this->getCurrency(
            config('currencies.default')
        );
    }

    public function syncCurrencies()
    {
        $currencies = config('currencies.available');

        $this->load();

        $defaultValue = $this->getDefaultCurrency();

        foreach ($currencies as $code => $symbol)
        {

            $currency = Currency::whereCode($code)->first();

            if (!$currency) {
                $currency = Currency::create(['code' => $code]);
            }

            $lastValue = $currency->value;

            if ($code === config('currencies.default')) {
                $currency->value = null;
            } else {
                $value = $defaultValue / $this->getCurrency($code);
                $currency->value = $value;
            }
            $currency->last_value = $lastValue;
            $currency->save();
        }
    }

}