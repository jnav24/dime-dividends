<?php

namespace App\Services;

use App\Models\Dividend;
use App\Queries\DividendQuery;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class UpdatePayoutService
{
    public function __invoke(SeekingAlphaService $seekingAlphaService)
    {
        $dividends = Dividend::where('updated_at', '<=', Carbon::today())->take(15)->get();
        $dividends->each(function ($dividend) use ($seekingAlphaService) {
            $data = $seekingAlphaService->getHoldingDetails($dividend->ticker);
            if (!empty($data)) {
                DividendQuery::save($dividend, $data);
            }
        });

        Log::info('Payouts updated: ' . json_encode($dividends->pluck('ticker')));
    }
}
