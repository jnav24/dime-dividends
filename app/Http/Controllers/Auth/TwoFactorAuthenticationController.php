<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\RecoveryCodeService;
use App\Services\TwoFactorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
        session()->put(config('session.mfa'), Auth::user()->id);

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
        session()->forget(config('session.mfa'));

        return response()->json(['success' => true]);
    }

    public function verify(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'code' => ['required', 'numeric'],
        ]);

        $user = Auth::user();

        if (empty($user) || empty($user->two_factor_secret)) {
            return response()->json([
                'success' => false
            ]);
        }

        if (!app(TwoFactorService::class)->verify(decrypt($user->two_factor_secret), $validated['code'])) {
            return response()->json([
                'errors' => ['two-factor-challenge' => ['The provided two factor authentication code was invalid.']],
                'success' => false
            ], 422);
        }

        session()->put(config('session.mfa'), $user->id);
        return response()->json(['success' => true]);
    }
}
