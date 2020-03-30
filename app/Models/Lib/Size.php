<?php

namespace App\Models\Lib;


class Size extends BaseLibModel
{
    const MANY_TABLE = 'pizza_sizes';

    protected $casts = [
        'default_price' => 'float',
    ];
}
