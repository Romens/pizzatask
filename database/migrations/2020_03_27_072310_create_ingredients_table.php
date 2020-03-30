<?php

use App\Models\Ingredient;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIngredientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ingredients', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->timestamps();
        });

        Schema::create(Ingredient::MANY_TABLE, function (Blueprint $table) {
            $table->unsignedBigInteger('pizza_id')->index();
            $table->unsignedBigInteger('ingredient_id')->index();

            $table->unique([
                'pizza_id',
                'ingredient_id',
            ]);

            $table->foreign('pizza_id')->references('id')->on('pizzas');
            $table->foreign('ingredient_id')->references('id')->on('ingredients');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ingredients');
    }
}
