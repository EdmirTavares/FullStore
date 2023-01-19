<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ProductController;


Route::middleware('auth:sanctum')
    ->namespace('App\Http\Controllers\Api\V1')
    ->group(function () {

        Route::get("/products", [ProductController::class, "index"])
            ->withoutMiddleware('auth:sanctum');
    });
