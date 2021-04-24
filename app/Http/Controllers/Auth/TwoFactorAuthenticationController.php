<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\RecoveryCodeService;
use App\Services\TwoFactorService;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use PragmaRX\Google2FA\Exceptions\IncompatibleWithGoogleAuthenticatorException;
use PragmaRX\Google2FA\Exceptions\InvalidCharactersException;
use PragmaRX\Google2FA\Exceptions\SecretKeyTooShortException;

class TwoFactorAuthenticationController extends Controller
{
    /**
     * @throws IncompatibleWithGoogleAuthenticatorException
     * @throws SecretKeyTooShortException
     * @throws InvalidCharactersException
     */
    public function store(RecoveryCodeService $recoveryCodeService, TwoFactorService $twoFactorService)
    {
        Auth::user()->forceFill([
            'two_factor_secret' => encrypt($twoFactorService->generateSecretKey()),
            'two_factor_recovery_codes' => encrypt(
                json_encode(
                    Collection::times(
                        8,
                        fn () => $recoveryCodeService->generate()
                    )->all()
                )
            ),
        ])->save();
    }
}
