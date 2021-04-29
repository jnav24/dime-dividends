<?php

namespace App\Services;

use Illuminate\Support\Str;

class RecoveryCodeService
{
    public function generate()
    {
        return Str::random(10).'-'.Str::random(10);
    }
}
