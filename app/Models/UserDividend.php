<?php

namespace App\Models;

use \DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserDividend
 *
 * @property int $id
 * @property int $user_id
 * @property int $dividend_id
 * @property float $quantity
 * @property float $portfolio_value
 * @property string $next_payout_at
 * @property DateTime $created_at
 * @property DateTime $updated_at
 */
class UserDividend extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'dividend_id',
        'portfolio_value',
        'quantity',
    ];

    public function dividend(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Dividend::class, 'id', 'dividend_id');
    }
}
