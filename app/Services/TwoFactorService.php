<?php

namespace App\Services;

use BaconQrCode\Renderer\Color\Rgb;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\Fill;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use PragmaRX\Google2FA\Exceptions\IncompatibleWithGoogleAuthenticatorException;
use PragmaRX\Google2FA\Exceptions\InvalidCharactersException;
use PragmaRX\Google2FA\Exceptions\SecretKeyTooShortException;
use PragmaRX\Google2FA\Google2FA;

class TwoFactorService
{
    public function __construct(
        protected Google2FA $google2fa
    ) {}

    /**
     * @throws IncompatibleWithGoogleAuthenticatorException
     * @throws SecretKeyTooShortException
     * @throws InvalidCharactersException
     */
    public function generateSecretKey(): string
    {
        return $this->google2fa->generateSecretKey();
    }

    /**
     * @param string $companyName
     * @param string $companyEmail
     * @param string $secretKey
     * @return string
     */
    private function qrCodeUrl(string $companyName, string $companyEmail, string $secretKey): string
    {
        return $this->google2fa->getQRCodeUrl($companyName, $companyEmail, $secretKey);
    }

    /**
     * @param string $secret
     * @param string $code
     * @return bool
     * @throws IncompatibleWithGoogleAuthenticatorException
     * @throws InvalidCharactersException
     * @throws SecretKeyTooShortException
     */
    public function verify(string $secret, string $code): bool
    {
        return $this->google2fa->verifyKey($secret, $code);
    }

    /**
     * @param string $companyName
     * @param string $companyEmail
     * @param string $secretKey
     * @return string
     */
    public function twoFactorQrCodeSvg(string $companyName, string $companyEmail, string $secretKey): string
    {
        $svg = (new Writer(
            new ImageRenderer(
                new RendererStyle(192, 0, null, null, Fill::uniformColor(new Rgb(255, 255, 255), new Rgb(45, 55, 72))),
                new SvgImageBackEnd
            )
        ))->writeString(
            $this->qrCodeUrl($companyName, $companyEmail, $secretKey)
        );

        return trim(substr($svg, strpos($svg, "\n") + 1));
    }
}
