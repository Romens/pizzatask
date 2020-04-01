<?php

use App\Models\Order;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('address_id');
            $table->unsignedBigInteger('payment_type_id');
            $table->unsignedBigInteger('currency_id');
            $table->timestamp('delivered_at')->nullable();
            $table->text('comment')->nullable();
            $table->decimal('price');
            $table->string('status')->default(Order::STATUS_NEW);
            $table->timestamps();

            $table->foreign('client_id')->references('id')->on('clients');
            $table->foreign('address_id')->references('id')->on('addresses');
            $table->foreign('payment_type_id')->references('id')->on('payment_types');
            $table->foreign('currency_id')->references('id')->on('currencies');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
