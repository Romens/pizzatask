<?php

namespace App\Models\Lib;


class Currency extends BaseLibModel
{
    public $timestamps = true;

    protected $attributes = [
        'value' => null,
        'last_value' => null,
    ];

    protected $appends = [
        'is_default',
    ];

    protected function getIsDefaultAttribute(): bool
    {
        return $this->attributes['code'] === config('currencies.default');
    }
}
