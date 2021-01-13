<?php

namespace App\Models;

use \DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Dividend
 *
 * @property int $id
 * @property string $ticker
 * @property string $name
 * @property float $yield
 * @property float $amount_per_share
 * @property float $payout_ratio
 * @property string $frequency
 * @property string $next_payout_at
 * @property DateTime $created_at
 * @property DateTime $updated_at
 */
class Dividend extends Model
{
    use HasFactory;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'id',
        'created_at',
        'updated_at',
    ];
}
