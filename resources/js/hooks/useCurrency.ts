export default function useCurrency() {
    const formatDollar = (amount: number | string) => {
        const price = typeof amount === 'string' ? Number(amount) : amount;
        return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const getYtd = (start: string | number, end: string | number) => {
        const endAmount = typeof end === 'string' ? Number(end) : end;
        const startAmount = typeof start === 'string' ? Number(start) : start;
        return Math.round(
            Math.abs(((startAmount - endAmount) / startAmount) * 100)
        );
    };

    return { formatDollar, getYtd };
}
