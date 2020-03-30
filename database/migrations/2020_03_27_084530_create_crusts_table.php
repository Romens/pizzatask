<?php

use App\Models\Lib\Crust;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCrustsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('crusts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->decimal('price');
        });

        Schema::create(Crust::MANY_TABLE, function (Blueprint $table) {
            $table->unsignedBigInteger('pizza_id')->index();
            $table->unsignedBigInteger('crust_id')->index();

            $table->unique([
                'pizza_id',
                'crust_id',
            ]);

            $table->foreign('pizza_id')->references('id')->on('pizzas');
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
        Schema::dropIfExists('crusts');
    }
}
