<?php

use App\Http\Controllers\{HoldingsController, IncomeController, SettingsController};
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
    return Inertia::render('auth/Login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::group(['middleware' => 'password.confirm'], function () {
        // Any pages you want the user to enter their password before showing the view
    });

    // Pages
    Route::get('dashboard', [HoldingsController::class, 'index'])->name('dashboard');
    Route::get('/income', [IncomeController::class, 'index'])->name('income');
    Route::get('settings', [SettingsController::class, 'index']);

    // AJAX Calls
    Route::post('add-holding', [HoldingsController::class, 'store'])->name('add-holding');
    Route::post('update-holding/{id}', [HoldingsController::class, 'update'])->name('update-holding');
    Route::get('search/{ticker}', [HoldingsController::class, 'searchByTicker']);
    Route::post('settings/profile', [SettingsController::class, 'updateProfileInformation']);
    Route::post('settings/password', [SettingsController::class, 'updatePassword']);
});

require __DIR__.'/auth.php';
