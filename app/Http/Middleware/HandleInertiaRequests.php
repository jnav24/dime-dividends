<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'app_url' => fn () => env('APP_URL'),
            'errors' => function () {
                return Session::get('errors')
                    ? Session::get('errors')->getBag('default')->getMessages()
                    : (object) [];
            },
            'flash' => function () use ($request) {
                if (empty($request->session()->get('message'))) {
                    return [];
                }

                return [
                    'message' => $request->session()->get('message')
                ];
            },
            'status' => function () {
                return Session::get('status') ? Session::get('status') : '';
            },
            'request' => fn () => $request,
            'reset_password_token' => fn () => $request->route('token') ?? '',
            'user' => function () {
                $user = Auth::user();
                if ($user) {
                    return [
                        'mfa_enabled' => !empty($user->two_factor_secret),
                    ] + $user->toArray();
                }
                return [];
            },
        ]);
    }
}
