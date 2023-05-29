<?php

use App\Http\Controllers\BlogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();


});

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/loginportoken', [UserController::class, 'loginportoken']);
Route::post('/logout', [UserController::class, 'logout']);
Route::post('/datauser', [UserController::class, 'datauser']);
Route::post('/editarusu', [UserController::class, 'editarusu']);

Route::post('/createblog', [BlogController::class, 'createblog']);
