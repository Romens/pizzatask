<?php

namespace App\Models\Lib;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

abstract class BaseLibModel extends Model
{
    public $timestamps = false;

    public static function allWithCache($minute = 60)
    {
        $time = Carbon::now()->addMinutes($minute);

        return cache()->remember(static::class, $time, function () {
            return static::all();
        });
    }
}
