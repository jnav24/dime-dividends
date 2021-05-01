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

    type HoldingsModalType = {
        handleAddHolding: (holding: HoldingSubmitType) => void;
        handleShowModal: (e: boolean) => void;
        show: boolean;
        data: HoldingType;
    }

    type HoldingSubmitType = {
        id?: number;
        ticker: string;
        shares: string;
        sharePrice: string;
    }
}

export = Holdings;
