<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;


Route::middleware('auth:sanctum')
    ->namespace('App\Http\Controllers\Api\V1')
    ->group(function () {

    Route::post('/auth/register', [AuthController::class, 'createUser'])
    ->withoutMiddleware('auth:sanctum');
    Route::post('/auth/login', [AuthController::class, 'login'])
    ->withoutMiddleware('auth:sanctum');

});
