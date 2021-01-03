<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::group(['middleware' => 'auth'], function () {
    Route::group(['middleware' => 'password.confirm'], function () {
        // Any pages you need a confirm password view to show.
        Route::get('/income', function () {
            return Inertia::render('Income');
        })->name('income');
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/search/{ticker}', [\App\Http\Controllers\HoldingsController::class, 'searchByTicker']);
});

require __DIR__.'/auth.php';
