<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class HoldingsController extends Controller
{
    public function searchByTicker($ticker)
    {
        $response = Http::get('https://seekingalpha.com/api/common/ac/search?limit=5&symbols=1&term=' . $ticker);
        return $response->json()['symbols'] ?? [];
    }
}
