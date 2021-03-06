import React, { useEffect, useState } from 'react';
import axios from 'axios';

import AddIcon from '../components/ui-elements/icons/AddIcon';
import Auth from './layouts/Auth';
import AuthContent from './layouts/AuthContent';
import BannerImage from '../../assets/banner_user_profile.jpg';
import Card from '../components/ui-elements/card/Card';
import CustomButton from '../components/ui-elements/form/CustomButton';
import EditIcon from '../components/ui-elements/icons/EditIcon';
import EditHoldingsModal from '../components/modals/EditHoldingsModal';
import HoldingsSummary from '../components/partials/HoldingsSummary';
import HoldingsModal from '../components/modals/HoldingsModal';
import WarningIcon from '../components/ui-elements/icons/WarningIcon';
import useUtils from '../hooks/useUtils';
import useCurrency from '../hooks/useCurrency';
import { HoldingType, HoldingSubmitType } from '../@types/holdings';
import useTimestamp from '../hooks/useTimestamp';
import Pagination from '../components/partials/Pagination';

type DashboardType = {
	holdings: HoldingType[];
};

const Dashboard: React.FC<DashboardType> = ({ holdings }) => {
	const { ucFirst } = useUtils();
	const { formatDollar } = useCurrency();
	const { formatDate } = useTimestamp();

	const [data, setData] = useState<Array<HoldingType>>([]);
	const [selectedData, setSelectedData] = useState<HoldingType>(
		{} as HoldingType
	);
	const [showModal, setShowModal] = useState(false);
	const [showEditHoldingsModal, setShowEditHoldingsModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = 10;

	const frequency = {
		annually: 1,
		semiannual: 2,
		monthly: 12,
		quarterly: 4,
	};

	const headers = [
		'Ticker',
		'Shares',
		'Portfolio Value',
		'Dividend Yield',
		'Payout Per Share',
		'Annual Income',
		'Next Payout',
		'Frequency',
		'',
	];

	const sortHoldings = (data: Array<HoldingType>) => {
		return data.sort((a, b) => a.ticker.localeCompare(b.ticker));
	};

	useEffect(() => {
		setData(sortHoldings(holdings));
	}, []);

	useEffect(() => {
		if (Object.keys(selectedData).length) {
			setShowEditHoldingsModal(true);
		}
	}, [selectedData]);

	const addHolding = async (holding: HoldingSubmitType) => {
		const response = await axios.post('/add-holding', holding);
		if (response.data.success) {
			setData(sortHoldings([...data, response.data.data]));
		}
	};

	const updateHolding = async (holding: HoldingSubmitType) => {
		const tempData: Array<HoldingType> = JSON.parse(JSON.stringify(data));
		const index = tempData.findIndex((dt) => dt.id === holding.id);

		if (index > -1) {
			const indexData = tempData[index];
			const shareDifference = Math.abs(
				+indexData.quantity - +holding.shares
			);
			let newPrice = 0.0;

			if (+indexData.quantity < +holding.shares) {
				newPrice =
					+holding.sharePrice * shareDifference +
					+indexData.portfolio_value;
			} else {
				newPrice = Math.abs(
					+holding.sharePrice * shareDifference -
						+indexData.portfolio_value
				);
			}

			const response = await axios.post(`/update-holding/${holding.id}`, {
				ticker: holding.ticker,
				shares: holding.shares,
				sharePrice: newPrice,
			});

			if (response.data.success) {
				indexData.ticker = holding.ticker;
				indexData.quantity = +holding.shares;
				indexData.portfolio_value = newPrice;
				setTimeout(() => setData(tempData), 250);
			}
		}
	};

	const submitHolding = (holding: HoldingSubmitType) => {
		if (!holding.id) {
			return addHolding(holding);
		}

		return updateHolding(holding);
	};

	const doesTickerExistInHoldings = (ticker: string) => {
		return !!data.filter((holding) => holding.ticker === ticker).length;
	};

	return (
		<Auth>
			<HoldingsModal
				show={showModal}
				handleShowModal={(e) => {
					setShowModal(e);
					setSelectedData({} as HoldingType);
				}}
				handleAddHolding={submitHolding}
				validateTicker={doesTickerExistInHoldings}
			/>

			<EditHoldingsModal
				data={selectedData}
				show={showEditHoldingsModal}
				handleShowModal={(e) => {
					setShowEditHoldingsModal(e);
					setSelectedData({} as HoldingType);
				}}
				handleAddHolding={submitHolding}
			/>

			<div className="w-full relative overflow-hidden">
				<div className="bg-dark-primary w-full h-full absolute z-20 bg-opacity-90" />
				<img
					src={BannerImage}
					className="w-full h-full object-fill absolute z-10"
				/>

				<div className="relative z-30">
					<AuthContent>
						<HoldingsSummary
							holdings={data}
							handleShowModal={setShowModal}
						/>
					</AuthContent>
				</div>
			</div>

			<AuthContent>
				<Card className="overflow-hidden">
					<div
						className={`grid gap-2 grid-cols-2 sm:grid-cols-${
							headers.length + 1
						} bg-gray-200`}
					>
						{headers.map((header, int) => (
							<p
								className={`pl-2 py-4 text-gray-700 text-sm ${
									int === 0 ? 'col-span-2' : ''
								}`}
								key={int}
							>
								{header}
							</p>
						))}
					</div>

					{!data.length && (
						<div className="py-8 text-gray-500 flex flex-col items-center justify-center">
							<WarningIcon className="w-12 h-12" />
							<span className="text-lg">Uh oh!</span>
							<span className="text-gray-400 text-sm">
								Looks like you haven't added any dividend
								holdings yet.
							</span>
							<span className="text-gray-400 text-sm mb-4">
								Click the button to add a holding.
							</span>
							<CustomButton
								color="secondary"
								handleClick={() => setShowModal(true)}
							>
								<AddIcon className="w-4 h-4" />
								Add Holding
							</CustomButton>
						</div>
					)}

					{data
						.slice(
							totalPages * (currentPage - 1),
							totalPages * currentPage
						)
						.map((holding) => (
							<div
								className={`grid grid-cols-${
									headers.length + 1
								} gap-2 text-gray-700 py-4 items-center text-sm bg-white hover:bg-primary hover:bg-opacity-10`}
								key={holding.id}
							>
								<div className="pl-2 col-span-2">
									<p className="font-body font-bold text-lg">
										{holding.ticker}
									</p>
									<p>{holding.name}</p>
								</div>

								<div className="pl-2">{holding.quantity}</div>

								<div className="pl-2">
									${formatDollar(holding.portfolio_value)}
								</div>

								<div className="pl-2">{Number(holding.yield).toFixed(2)}%</div>

								<div className="pl-2">
									${formatDollar(holding.amount_per_share)}
								</div>

								<div className="pl-2">
									$
									{formatDollar(
										holding.amount_per_share *
											(frequency as any)[
												holding.frequency
											] *
											holding.quantity
									)}
								</div>

								<div className="pl-2">
									{formatDate(
										'MM/dd/yyyy',
										holding.next_payout_at
									)}
								</div>

								<div className="pl-2">
									{ucFirst(holding.frequency)}
								</div>

								<div className="text-center">
									<CustomButton
										fab
										color="secondary"
										handleClick={() =>
											setSelectedData(holding)
										}
									>
										<EditIcon className="w-4 h-4" />
									</CustomButton>
								</div>
							</div>
						))}
				</Card>
				<Pagination
					amountPerPage={totalPages}
					currentPage={currentPage}
					totalPages={data.length}
					handlePageChange={setCurrentPage}
				/>
			</AuthContent>
		</Auth>
	);
};

export default Dashboard;
