<?php

namespace App\Http\Controllers;

use App\Models\Dividend;
use App\Models\UserDividend;
use App\Services\SeekingAlphaService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HoldingsController extends Controller
{
    public function index(): \Inertia\Response
    {
        $holdings = UserDividend::where('user_id', auth()->user()->id)->get();

        return Inertia::render('Dashboard', [
            'holdings' => $holdings->map(function ($holding) {
                return [
                        'quantity' => $holding->quantity,
                        'portfolio_value' => $holding->portfolio_value,
                    ] + $holding->dividend->toArray();
            }),
        ]);
    }

    public function store(Request $request, SeekingAlphaService $seekingAlphaService): \Illuminate\Http\JsonResponse
    {
        $validated = $request->validate([
            'ticker' => 'required',
            'shares' => 'required',
            'sharePrice' => 'required',
        ]);

        $dividend = Dividend::where('ticker', $validated['ticker'])->first();

        if (empty($dividend)) {
            $data = $seekingAlphaService->getHoldingDetails($validated['ticker']);

            $dividend = new Dividend;
            $dividend->ticker = $data['ticker'];
            $dividend->name = $data['name'];
            $dividend->yield = $data['yield'];
            $dividend->amount_per_share = $data['amount-per-share'];
            $dividend->payout_ratio = $data['payout-ratio'];
            $dividend->frequency = strtolower($data['frequency']);
            $dividend->next_payout_at = Carbon::createFromFormat('Y-m-d', $data['next-payout']);
            $dividend->save();
        }

        $userDividend = new UserDividend();
        $userDividend->user_id = auth()->user()->id;
        $userDividend->dividend_id = $dividend->id;
        $userDividend->portfolio_value = (float)$validated['sharePrice'] * (int)$validated['shares'];
        $userDividend->quantity = (int)$validated['shares'];
        $userDividend->save();

        return response()->json([
            'success' => true,
            'data' => [
                'quantity' => $userDividend->quantity,
                'portfolio_value' => $userDividend->portfolio_value,
            ] + $dividend->toArray(),
        ]);
    }

    public function searchByTicker(SeekingAlphaService $seekingAlphaService, $ticker): array
    {
        return $seekingAlphaService->searchHoldingByTicker($ticker);
    }
}
