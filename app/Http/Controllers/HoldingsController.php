<?php

namespace App\Http\Controllers;

use App\Models\UserDividend;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class HoldingsController extends Controller
{
    public function index(): \Inertia\Response
    {
        $holdings = UserDividend::with(['dividend'])->where('user_id', auth()->user()->id)->get();

        return Inertia::render('Dashboard', [
            'holdings' => $holdings,
        ]);
    }

    public function searchByTicker($ticker): array
    {
        $response = Http::get('https://seekingalpha.com/api/common/ac/search?limit=5&symbols=1&term=' . $ticker);
        return $response->json()['symbols'] ?? [];
    }
}
