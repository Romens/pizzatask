<?php

namespace App\Models\Lib;


class Crust extends BaseLibModel
{
    const MANY_TABLE = 'pizza_crusts';

    protected $casts = [
        'price' => 'float',
    ];
}
