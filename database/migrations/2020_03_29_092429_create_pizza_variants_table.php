<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePizzaVariantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pizza_variants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pizza_id')->index();
            $table->unsignedBigInteger('size_id')->index();
            $table->unsignedBigInteger('crust_id')->index();
            $table->decimal('price');
            $table->timestamps();

            $table->unique([
                'pizza_id',
                'size_id',
                'crust_id',
            ]);

            $table->foreign('pizza_id')->references('id')->on('pizzas');
            $table->foreign('size_id')->references('id')->on('sizes');
            $table->foreign('crust_id')->references('id')->on('crusts');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pizza_variants');
    }
}
