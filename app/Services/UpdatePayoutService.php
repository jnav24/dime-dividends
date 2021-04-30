<?php

namespace App\Services;

use App\Models\Dividend;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class UpdatePayoutService
{
    public function __invoke(SeekingAlphaService $seekingAlphaService)
    {
        $dividends = Dividend::whereDate('next_payout_at', '<=', Carbon::now())->get();
        $dividends->each(function ($dividend) use ($seekingAlphaService) {
            $data = $seekingAlphaService->getHoldingDetails($dividend->ticker);
            if (!empty($data)) {
                $dividend->yield = $data['yield'];
                $dividend->amount_per_share = $data['amount-per-share'];
                $dividend->payout_ratio = $data['payout-ratio'];
                $dividend->frequency = strtolower($data['frequency']);
                $dividend->next_payout_at = Carbon::createFromFormat('Y-m-d', $data['next-payout']);
                $dividend->save();
            }
        });

        Log::info('Payouts updated: ' . json_encode($dividends->pluck('ticker')));
    }
}
