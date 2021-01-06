<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SeekingAlphaService
{
    private string $domain = 'https://seekingalpha.com/';

    private function setHoldingsData(array $data): array
    {
        return [
            'amount-per-share' => $data['dividends'][0]['amount'],
            'frequency' => $data['divDistribution'],
            'name' => $data['companyName'],
            'next-payout' => $data['dividends'][0]['payDate'],
            'payout-ratio' => $data['payoutRatio'],
            'ticker' => $data['id'],
            'yield' => $data['divYield'],
        ];
    }

    public function getHoldingDetails(string $ticker)
    {
        $params = [
            'slugs' => $ticker,
            'fields' => [
                'companyName',
                'divDistribution',
                'dividends',
                'divRate',
                'divYield',
                'longDesc',
                'marketCap',
                'numberOfEmployees',
                'payoutRatio',
                'sectorname',
                'totalEnterprise',
                'yearfounded',
            ]
        ];

        $query = preg_replace('/\[\d+\]/', '[]', urldecode(http_build_query($params)));

        $response = Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->get("{$this->domain}api/v3/symbol_data?{$query}");
        return $this->setHoldingsData($response->json()['data'][0]['attributes']);
    }

    public function getUpcomingDividends(string $ticker)
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->get("{$this->domain}symbol/{$ticker}/dividends/upcoming_dividends");
        return $response->json()['data'][0];
    }

    public function searchHoldingByTicker(string $ticker)
    {
        $response = Http::get($this->domain . 'api/common/ac/search?limit=5&symbols=1&term=' . $ticker);
        return $response->json()['symbols'] ?? [];
    }
}
