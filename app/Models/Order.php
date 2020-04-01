<?php

namespace App\Models;

use App\Models\Lib\Currency;
use App\Models\Lib\PaymentType;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    const STATUS_NEW = 'new';
    const STATUS_WAIT_PAYMENT = 'wait_payment';
    const STATUS_IN_PROGRESS = 'in_progress';
    const STATUS_DELIVERED = 'delivered';
    const STATUS_NOT_DELIVERED = 'not_delivered';

    protected $attributes = [
        'status' => Order::STATUS_NEW,
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function paymentType()
    {
        return $this->belongsTo(PaymentType::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }
}
