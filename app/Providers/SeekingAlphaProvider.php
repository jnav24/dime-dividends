<?php

namespace App\Providers;

use App\Services\SeekingAlphaService;
use Illuminate\Support\ServiceProvider;

class SeekingAlphaProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(SeekingAlphaService::class, function ($app) {
            return new SeekingAlphaService();
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
