<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'phone',
        'name',
    ];

    static public function getClient($phone, $name)
    {
        return Client::updateOrCreate(
            ['phone' => $phone],
            ['name' => $name]
        );
    }
}
