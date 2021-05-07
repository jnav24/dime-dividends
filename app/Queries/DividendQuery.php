<?php

namespace App\Queries;

use App\Models\Dividend;
use Carbon\Carbon;

class DividendQuery
{
    /**
     * @param Dividend $dividend
     * @param array $data
     * @return Dividend
     */
    public static function save(Dividend $dividend, array $data): Dividend
    {
        $dividend->ticker = $data['ticker'];
        $dividend->name = $data['name'];
        $dividend->yield = number_format($data['yield'], 2);
        $dividend->amount_per_share = $data['amount-per-share'];
        $dividend->payout_ratio = $data['payout-ratio'];
        $dividend->frequency = strtolower($data['frequency']);
        $dividend->next_payout_at = Carbon::createFromFormat('Y-m-d', $data['next-payout']);
        $dividend->save();
        return $dividend;
    }
}
