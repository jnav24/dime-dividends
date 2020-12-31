import React from 'react';

import AddIcon from '../ui-elements/icons/AddIcon';
import CustomButton from '../ui-elements/form/CustomButton';

type HoldingsSummaryType = {
    handleShowModal: (e: boolean) => void,
}

const HoldingsSummary: React.FC<HoldingsSummaryType> = ({ handleShowModal }) => {
	return (
		<>
			<div className="flex flex-row justify-between items-center border-b border-gray-400 pt-5 pb-6">
				<div className="flex flex-row items-end">
					<h2 className="text-gray-100 font-header text-5xl mr-2 tracking-tight">
						$1,200
					</h2>
					<p className="text-gray-100 font-header text-lg">
						Annual Income
					</p>
				</div>

				<CustomButton color="secondary" handleClick={() => handleShowModal(true)}>
					<AddIcon className="w-4 h-4 mr-2" /> Add Holding
				</CustomButton>
			</div>

			<div className="flex flex-row justify-between items-center pt-5">
				<div>
					<p className="text-gray-100 font-header text-sm">
						Dividend Yield
					</p>
					<p className="text-gray-100 font-header text-3xl mr-2 tracking-tight">
						6.35%
					</p>
				</div>

				<div>
					<p className="text-gray-100 font-header text-sm">
						Projected Monthly Income
					</p>
					<p className="text-gray-100 font-header text-3xl mr-2 tracking-tight">
						$100.00
					</p>
				</div>

				<div>
					<p className="text-gray-100 font-header text-sm">
						Average Monthly Income
					</p>
					<p className="text-gray-100 font-header text-3xl mr-2 tracking-tight">
						$46.37
					</p>
				</div>

				<div>
					<p className="text-gray-100 font-header text-sm">
						Top Performing Stock
					</p>
					<p className="text-gray-100 font-header text-3xl mr-2 tracking-tight">
						MO
					</p>
				</div>
			</div>
		</>
	);
};

export default HoldingsSummary;
