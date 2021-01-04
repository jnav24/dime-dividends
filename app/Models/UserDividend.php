<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDividend extends Model
{
    use HasFactory;

    public function dividend(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(UserDividend::class);
    }
}
