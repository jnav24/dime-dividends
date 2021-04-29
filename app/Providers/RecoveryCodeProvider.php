<?php

namespace App\Providers;

use App\Services\RecoveryCodeService;
use Illuminate\Support\ServiceProvider;

class RecoveryCodeProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(RecoveryCodeService::class, function ($app) {
            return new RecoveryCodeService();
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
