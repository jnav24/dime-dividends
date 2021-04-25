<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Auth\Factory as Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TwoFactorAuthenticate
{
    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(
        protected Auth $auth
    ) {}

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string[]  ...$guards
     * @throws AuthenticationException
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        $user = $request->user();

        if (empty($user)) {
            return $next($request);
        }

        if (
            !empty($user->two_factor_secret) &&
            (
                !$request->session()->has(config('session.mfa')) ||
                $request->session()->get(config('session.mfa')) !== $user->id
            )
        ) {
            $this->logout($request, $guards);
        }

        return $next($request);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param string[] $guards
     * @throws AuthenticationException
     */
    protected function logout(Request $request, array $guards)
    {
        $this->auth->guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        throw new AuthenticationException(
            'Unauthenticated.', $guards, route('login')
        );
    }
}
