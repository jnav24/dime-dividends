<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\RecoveryCodeService;
use App\Services\TwoFactorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use PragmaRX\Google2FA\Exceptions\IncompatibleWithGoogleAuthenticatorException;
use PragmaRX\Google2FA\Exceptions\InvalidCharactersException;
use PragmaRX\Google2FA\Exceptions\SecretKeyTooShortException;

class TwoFactorAuthenticationController extends Controller
{
    /**
     * @param TwoFactorService $twoFactorService
     * @return JsonResponse
     */
    public function show(TwoFactorService $twoFactorService): JsonResponse
    {
        $user = Auth::user();
        return response()->json([
            'success' => true,
            'qr_code' => [
                'svg' => $twoFactorService->twoFactorQrCodeSvg(
                    config('app.name'),
                    $user->email,
                    decrypt($user->two_factor_secret)
                )
            ],
            'recovery_codes' => decrypt($user->two_factor_recovery_codes),
        ]);
    }

    /**
     * @throws IncompatibleWithGoogleAuthenticatorException
     * @throws SecretKeyTooShortException
     * @throws InvalidCharactersException
     */
    public function store(RecoveryCodeService $recoveryCodeService, TwoFactorService $twoFactorService): JsonResponse
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

        return response()->json(['success' => true]);
    }

    /**
     * @return JsonResponse
     */
    public function destroy(): JsonResponse
    {
        Auth::user()->forceFill([
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
        ])->save();

        return response()->json(['success' => true]);
    }
}
