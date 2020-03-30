<?php

use App\Models\Lib\Size;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSizesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sizes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('persons');
            $table->decimal('default_price');
        });

        Schema::create(Size::MANY_TABLE, function (Blueprint $table) {
            $table->unsignedBigInteger('pizza_id')->index();
            $table->unsignedBigInteger('size_id')->index();
            $table->decimal('price')->nullable();

            $table->unique([
                'pizza_id',
                'size_id',
            ]);

            $table->foreign('pizza_id')->references('id')->on('pizzas');
            $table->foreign('size_id')->references('id')->on('sizes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sizes');
    }
}
