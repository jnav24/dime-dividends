<?php

namespace App\Queries;

use App\Models\Dividend;
use Carbon\Carbon;

class DividendQuery
{
    public static function update(Dividend $dividend, array $data)
    {
        $dividend->ticker = $data['ticker'];
        $dividend->name = $data['name'];
        $dividend->yield = $data['yield'];
        $dividend->amount_per_share = $data['amount-per-share'];
        $dividend->payout_ratio = $data['payout-ratio'];
        $dividend->frequency = strtolower($data['frequency']);
        $dividend->next_payout_at = Carbon::createFromFormat('Y-m-d', $data['next-payout']);
        $dividend->save();
    }
}
