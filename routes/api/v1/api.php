<?php


Route::get('pizzas', 'PizzasController@index');
Route::post('orders', 'OrdersController@create');