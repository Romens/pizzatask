<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'address',
        'client_id',
        'zip_code',
    ];

    /**
     * @param Client $client
     * @param string $address
     * @param int|null $zipCode
     * @return mixed
     */
    static public function getAddress(Client $client, string $address, ?int $zipCode = null)
    {
        return Address::updateOrCreate(
            ['address' => $address, 'client_id' => $client->id],
            ['zip_code' => $zipCode]
        );
    }
}
