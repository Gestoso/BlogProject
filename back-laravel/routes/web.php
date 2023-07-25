<?php

use App\Mail\Recover;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {

});

Route::get('/recover/{id}', function ($id) {
    return redirect('http://localhost:4200/recover?id=' . $id);
});

