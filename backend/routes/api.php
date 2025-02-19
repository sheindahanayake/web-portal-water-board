<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormDataController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HrmController;
use App\Http\Controllers\GaFormController;
use App\Http\Controllers\DevelopmentWorkController;
use App\Http\Controllers\WaterQualityController;
use App\Http\Controllers\PlantInformationController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/data', 'DataController@index');

// Add the new route for form data submission
Route::post('/form-data', [FormDataController::class, 'store']);
Route::post('/hrm-submit', [HrmController::class, 'store']);
Route::post('/ga-form-submit', [GaFormController::class, 'store']);
Route::post('/development-work-submit', [DevelopmentWorkController::class, 'store']);
Route::post('/water-quality-submit', [WaterQualityController::class, 'store']);
Route::post('/plant-information-submit', [PlantInformationController::class, 'store']);

// Add the new routes for authentication
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:api')->get('/user', [AuthController::class, 'user']);
Route::get('/hrm-data', [HrmController::class, 'index']);
Route::get('/development-work-data', [DevelopmentWorkController::class, 'index']);
Route::get('/ga-form-data', [GaFormController::class, 'index']);
Route::get('/plant-information-data', [PlantInformationController::class, 'index']);
Route::get('/water-quality-data', [WaterQualityController::class, 'index']);
Route::get('/form-data', [FormDataController::class, 'index']);