import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import AddIcon from '../components/ui-elements/icons/AddIcon';
import Auth from './layouts/Auth';
import AuthContent from './layouts/AuthContent';
import BannerImage from '../../assets/banner_user_profile.jpg';
import Card from '../components/ui-elements/card/Card';
import CustomButton from '../components/ui-elements/form/CustomButton';
import HoldingsSummary from '../components/partials/HoldingsSummary';
import HoldingsModal from '../components/modals/HoldingsModal';
import WarningIcon from '../components/ui-elements/icons/WarningIcon';

type DashboardType = {
    holdings: any[],
}

const Dashboard: React.FC<DashboardType> = ({ holdings }) => {
	const [showModal, setShowModal] = useState(false);

	const headers = [
		'Ticker',
		'Shares',
		'Dividend Yield',
		'Payout Per Share',
		'Annual Payout',
		'Current Price',
		'Annual Income',
		'Payout Frequency',
	];
	const data: any[] = [];

	const addHolding = async (holding: {
        ticker: string;
        shares: string;
        sharePrice: string;
    }) => {
	    await Inertia.post('/add-holding', holding);
    };

	console.log(holdings);

	return (
		<Auth>
			<HoldingsModal show={showModal} handleShowModal={setShowModal} handleAddHolding={addHolding} />

			<div className="w-full relative overflow-hidden">
				<div className="bg-dark-primary w-full h-full absolute z-20 bg-opacity-90" />
				<img src={BannerImage} className="absolute z-10" />

				<div className="relative z-30">
					<AuthContent>
						<HoldingsSummary handleShowModal={setShowModal} />
					</AuthContent>
				</div>
			</div>

			<AuthContent>
				<h1>Dashboard</h1>
				<Card className="overflow-hidden">
					<div
						className={`grid gap-2 grid-cols-2 sm:grid-cols-${headers.length} bg-gray-200`}
					>
						{headers.map((header, int) => (
							<p
								className="pl-2 py-4 text-gray-700 text-sm"
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
							<CustomButton color="secondary" handleClick={() => setShowModal(true)}>
								<AddIcon className="w-4 h-4" />
								Add Holding
							</CustomButton>
						</div>
					)}

					{!!data.length && (
						<div
							className={`grid grid-cols-${headers.length} gap-2 text-gray-700 py-4 even:bg-gray-100 items-center text-sm`}
						>
							hello!
						</div>
					)}
				</Card>
			</AuthContent>
		</Auth>
	);
};

export default Dashboard;
