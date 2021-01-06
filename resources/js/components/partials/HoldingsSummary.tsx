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

	const [portfolioValue, setPortfolioValue] = useState(0.00);
	const [dividendYield, setDividendYield] = useState(0.00);
	const [incomeValue, setIncomeValue] = useState(0.00);

	useEffect(() => {
		let portfolio = 0.00;
		let divYield = 0.00;
		let income = 0.00;

		holdings.map((holding) => {
			portfolio += +holding.portfolio_value;
			divYield += +holding.yield;
			income += +holding.amount_per_share + +holding.quantity;
		});

		setDividendYield(Number((divYield / holdings.length).toFixed(2)));
		setPortfolioValue(portfolio);
        setIncomeValue(income);
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
						Average Monthly Income
					</p>
					<p className="text-gray-100 font-header text-3xl mr-2 tracking-tight">
						$0.00
					</p>
				</div>

				<div>
					<p className="text-gray-100 font-header text-sm">
						Top Performing Stock
					</p>
					<p className="text-gray-100 font-header text-3xl mr-2 tracking-tight">
						--
					</p>
				</div>
			</div>
		</>
	);
};

export default HoldingsSummary;
