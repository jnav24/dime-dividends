declare namespace Holdings {
    type HoldingType = {
        amount_per_share: number,
        frequency: string,
        id: number,
        name: string,
        next_payout_at: string,
        payout_ratio: number,
        portfolio_value: number,
        quantity: number,
        ticker: string,
        yield: number,
    }
}

export = Holdings;
