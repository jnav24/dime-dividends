<?php

namespace App\Http\Controllers;

use App\Models\Dividend;
use App\Models\UserDividend;
use App\Queries\DividendQuery;
use App\Services\SeekingAlphaService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class HoldingsController extends Controller
{
    public function index(): Response
    {
        $holdings = UserDividend::with('dividend')->where('user_id', auth()->user()->id)->get();

        return Inertia::render('Dashboard', [
            'holdings' => $holdings->map(function ($holding) {
                return [
                        'id' => $holding->id,
                        'quantity' => $holding->quantity,
                        'portfolio_value' => $holding->portfolio_value,
                    ] + $holding->dividend->toArray();
            }),
        ]);
    }

    public function store(Request $request, SeekingAlphaService $seekingAlphaService): JsonResponse
    {
        $validated = $request->validate([
            'ticker' => 'required',
            'shares' => 'required',
            'sharePrice' => 'required',
        ]);

        $dividend = Dividend::where('ticker', $validated['ticker'])->first();

        if (empty($dividend)) {
            $dividend = DividendQuery::save(
                new Dividend,
                $seekingAlphaService->getHoldingDetails($validated['ticker'])
            );
        }

        $userDividend = UserDividend::create([
            'user_id' => Auth::user()->id,
            'dividend_id' => $dividend->id,
            'portfolio_value' => (float)$validated['sharePrice'] * (int)$validated['shares'],
            'quantity' => (float)$validated['shares']
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $userDividend->id,
                'quantity' => $userDividend->quantity,
                'portfolio_value' => $userDividend->portfolio_value,
            ] + $dividend->toArray(),
        ]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'ticker' => 'required',
            'shares' => 'required',
            'sharePrice' => 'required',
        ]);

        $userDividend = UserDividend::where('user_id', auth()->user()->id)->where('id', $id)->first();
        $dividend = Dividend::where('ticker', $validated['ticker'])->first();

        if ($userDividend && $dividend) {
            $userDividend->update([
                'dividend_id' => $dividend->id,
                'portfolio_value' => (int)$validated['sharePrice'],
                'quantity' => (float)$validated['shares']
            ]);
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false]);
    }

    public function searchByTicker(SeekingAlphaService $seekingAlphaService, $ticker): array
    {
        return $seekingAlphaService->searchHoldingByTicker($ticker);
    }

    public function getRealTimePrice(SeekingAlphaService $seekingAlphaService, $ticker): array
    {
        return $seekingAlphaService->getRealTimePrice($ticker);
    }
}
