<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

abstract class BaseApiController extends Controller
{
    public function response(array $body): JsonResponse
    {
        $options = app()->environment('production') ? 0 : 128;

        $body['currencies'] = config('currencies.available');
        $body['default_currency'] = config('currencies.default');

        return response()->json($body, 200, [], $options);
    }
}
