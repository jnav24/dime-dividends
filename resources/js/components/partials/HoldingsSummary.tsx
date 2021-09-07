import React, { useEffect, useState } from 'react';

import AddIcon from '../ui-elements/icons/AddIcon';
import CustomButton from '../ui-elements/form/CustomButton';
import { HoldingType } from '../../@types/holdings';
import useCurrency from '../../hooks/useCurrency';

type HoldingsSummaryType = {
	handleShowModal: (e: boolean) => void;
	holdings: Array<HoldingType>;
};

const HoldingsSummary: React.FC<HoldingsSummaryType> = ({
	handleShowModal,
	holdings,
}) => {
	const { formatDollar } = useCurrency();

	const [portfolioValue, setPortfolioValue] = useState(0.0);
	const [dividendYield, setDividendYield] = useState(0.0);
	const [incomeValue, setIncomeValue] = useState(0.0);
	const [mostShares, setMostShares] = useState('');
	const [highestReturn, setHighestReturn] = useState('');

	const frequency = {
		annually: 1,
		semiannual: 2,
		monthly: 12,
		quarterly: 4,
	};

	useEffect(() => {
		let portfolio = 0.0;
		const delim = '/';
		let divYield = 0.0;
		let income = 0.0;
		let topShares = '--';
		let topReturn = '--';

		const calculateTopShare = (
			val: string,
			name: string,
			volume: string | number
		) => {
			if (!val.includes(delim)) {
				return `${name} ${delim} ${volume}`;
			}

			const [ticker, amount] = val.split(delim);

			if (+volume > +amount) {
				return `${name} ${delim} ${volume}`;
			}

			return `${ticker} ${delim} ${amount}`;
		};

		const setDollar = (value: string) => {
			let volume = '';
			const [ticker, amount] = value.split(delim);

			if (amount) {
				volume = formatDollar(amount.trim());
			}

			return `${ticker} ${delim} $${volume}`;
		};

		holdings.map((holding) => {
			portfolio += +holding.portfolio_value;
			divYield += +holding.yield;
			income +=
				(frequency as any)[holding.frequency] *
				+holding.amount_per_share *
				+holding.quantity;
			topShares = calculateTopShare(
				topShares,
				holding.ticker,
				holding.quantity
			);
			topReturn = calculateTopShare(
				topReturn,
				holding.ticker,
				holding.amount_per_share *
					(frequency as any)[holding.frequency] *
					holding.quantity
			);
		});

		if (!!divYield && !!holdings.length) {
			setDividendYield(
				Number(((incomeValue / portfolioValue) * 100).toFixed(2))
			);
		}

		setPortfolioValue(portfolio);
		setIncomeValue(income);
		setMostShares(topShares);
		setHighestReturn(topReturn !== '--' ? setDollar(topReturn) : topReturn);
	}, [holdings]);

	return (
		<>
			<div className="flex flex-row justify-between items-center border-b border-gray-400 pt-5 pb-6">
				<div className="flex flex-row items-end">
					<h2 className="text-gray-100 font-header text-5xl mr-2 tracking-tight">
						${formatDollar(incomeValue)}
					</h2>
					<p className="text-gray-100 font-header text-lg">
						Annual Income
					</p>
				</div>

				<CustomButton
					color="secondary"
					handleClick={() => handleShowModal(true)}
				>
					<AddIcon className="w-4 h-4 mr-2" /> Add Holding
				</CustomButton>
			</div>

			<div className="flex flex-row justify-between items-center pt-5">
				<div>
					<p className="text-gray-100 font-header text-sm">
						Dividend Yield
					</p>
					<p className="text-gray-100 font-header text-3xl mr-2 tracking-tight">
						{dividendYield}%
					</p>
				</div>

				<div>
					<p className="text-gray-100 font-header text-sm">
						Portfolio Value
					</p>
					<p className="text-gray-100 font-header text-3xl mr-2 tracking-tight">
						${formatDollar(portfolioValue)}
					</p>
				</div>

				<div>
					<p className="text-gray-100 font-header text-sm">
						Most Shares
					</p>
					<p className="text-gray-100 font-header text-3xl mr-2 tracking-tight">
						{mostShares}
					</p>
				</div>

				<div>
					<p className="text-gray-100 font-header text-sm">
						Highest Return
					</p>
					<p className="text-gray-100 font-header text-3xl mr-2 tracking-tight">
						{highestReturn}
					</p>
				</div>
			</div>
		</>
	);
};

export default HoldingsSummary;
