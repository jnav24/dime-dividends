import React, { useEffect, useState } from 'react';

import CustomButton from '../ui-elements/form/CustomButton';
import CustomInput from '../ui-elements/form/CustomInput';
import FormContextProvider from '../ui-elements/form/FormContextProvider';
import Modal from './Modal';

type HoldingsModalType = {
	handleShowModal: (e: boolean) => void;
	show: boolean;
};

const HoldingsModal: React.FC<HoldingsModalType> = ({
	handleShowModal,
	show,
}) => {
	const [isValid, setIsValid] = useState(false);
	const [shares, setShares] = useState('');
	const [sharePrice, setSharePrice] = useState('');
	const [ticker, setTicker] = useState('');
	const closeModal = () => {};

	useEffect(() => {
		return () => {
			setTicker('');
			setShares('');
			setSharePrice('');
			setIsValid(false);
		};
	}, []);

	return (
		<Modal handleShowModal={handleShowModal} show={show}>
			<div className="w-100">
				<div className="bg-gray-100 pl-2 py-2 text-2xl text-gray-700 font-header">
					Add Holding
				</div>

				<FormContextProvider
					valid={isValid}
					handleUpdateValid={setIsValid}
				>
					<div className="py-4 px-2">
						<CustomInput
							handleUpdateInput={setTicker}
							label="Ticker"
							rules={['required']}
							value={ticker}
						/>

						<CustomInput
							handleUpdateInput={setShares}
							label="Shares"
							rules={['required', 'numeric']}
							value={shares}
						/>

						<CustomInput
							handleUpdateInput={setSharePrice}
							label="Cost Per Share"
							rules={['required', 'float:2']}
							value={sharePrice}
						/>
					</div>

					<div className="bg-gray-100 flex-row flex justify-end py-2">
						<CustomButton
							handleClick={() => handleShowModal(false)}
							ignoreValidation
						>
							Cancel
						</CustomButton>
						<CustomButton color="secondary" isDisabled={!isValid}>
							Add Holding
						</CustomButton>
					</div>
				</FormContextProvider>
			</div>
		</Modal>
	);
};

export default HoldingsModal;
