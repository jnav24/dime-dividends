<?php

use App\Http\Controllers\{Auth\TwoFactorAuthenticationController, HoldingsController, SettingsController};
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
        // Any pages you need a confirm password view to show.
        Route::get('/income', function () {
            return Inertia::render('Income');
        })->name('income');
    });

    Route::get('dashboard', [HoldingsController::class, 'index'])->name('dashboard');
    Route::post('add-holding', [HoldingsController::class, 'store'])->name('add-holding');
    Route::post('update-holding/{id}', [HoldingsController::class, 'update'])->name('update-holding');

    Route::get('search/{ticker}', [HoldingsController::class, 'searchByTicker']);
    Route::get('settings', [SettingsController::class, 'index']);
    Route::post('settings/profile', [SettingsController::class, 'updateProfileInformation']);
    Route::post('settings/password', [SettingsController::class, 'updatePassword']);
    Route::delete('user/two-factor-authentication', [TwoFactorAuthenticationController::class, 'destroy']);
    Route::post('user/two-factor-authentication', [TwoFactorAuthenticationController::class, 'store']);
    Route::get('user/two-factor-qr-code', [TwoFactorAuthenticationController::class, 'show']);
});

require __DIR__.'/auth.php';
