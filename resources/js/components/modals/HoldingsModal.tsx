import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CustomAutocomplete from '../ui-elements/form/CustomAutocomplete';
import CustomButton from '../ui-elements/form/CustomButton';
import CustomInput, { HandleInputType } from '../ui-elements/form/CustomInput';
import FormContextProvider from '../ui-elements/form/FormContextProvider';
import Modal from './Modal';
import { HoldingsModalType, HoldingSubmitType } from '../../@types/holdings';

type AutocompleteLabelType = {
	name: string;
	company: string;
};

type Props = HoldingsModalType & {};

const AutocompleteLabel: React.FC<AutocompleteLabelType> = ({
	name,
	company,
}) => {
	return (
		<>
			<span className="font-bold mr-4">{name}</span>
			<span className="text-sm">{company}</span>
		</>
	);
};

const HoldingsModal: React.FC<Props> = ({
	handleAddHolding,
	handleShowModal,
	show,
}) => {
	const [tickerItems, setTickerItems] = useState([]);
	const [isValid, setIsValid] = useState(false);
	const [animateCloseModal, setAnimateCloseModal] = useState(false);
	const [shares, setShares] = useState('');
	const [sharePrice, setSharePrice] = useState('');
	const [ticker, setTicker] = useState('');
	const [tickerTimer, setTickerTimer] = useState<null | ReturnType<
		typeof setTimeout
	>>(null);

	useEffect(() => {
		if (!show) {
			setTicker('');
			setShares('');
			setSharePrice('');
			setIsValid(false);
		} else {
			setAnimateCloseModal(false);
		}
	}, [show]);

	const handleUpdateTicker = (e: HandleInputType) => {
		if (tickerTimer) {
			clearTimeout(tickerTimer);
		}

		if (e.event === 'change' && e.value.trim().length && e.value.toLowerCase() !== ticker.toLowerCase()) {
			setTickerTimer(
				setTimeout(() => {
					axios({
						method: 'GET',
						url: `/search/${e}`,
					}).then((response) => {
						setTickerItems(
							response.data.map(
								(item: { name: string; content: string }) => ({
									label: (
										<AutocompleteLabel
											name={item.name}
											company={item.content}
										/>
									),
									value: item.name,
								})
							)
						);
					});
				}, 250)
			);
		} else {
			setTickerItems([]);
		}

		setTicker(e.value);
	};

	const handleSelectAutocomplete = (e: string) => {
		setTickerItems([]);
		if (e !== ticker) {
			handleUpdateTicker({ event: 'select', value: e });
		}
	};

	return (
		<Modal
			handleShowModal={handleShowModal}
			show={show}
			animateCloseModal={animateCloseModal}
		>
			<div className="w-100">
				<div className="bg-gray-100 pl-2 py-2 text-2xl text-gray-700 font-header">
					Add Holding
				</div>

				<FormContextProvider
					valid={isValid}
					handleUpdateValid={setIsValid}
				>
					<div className="py-4 px-2">
						<CustomAutocomplete
							handleSelectAutocomplete={handleSelectAutocomplete}
							handleUpdateInput={handleUpdateTicker}
							items={tickerItems}
							label="Ticker"
							rules={['required']}
							value={ticker}
						/>

						<CustomInput
							handleUpdateInput={(e) => setShares(e.value)}
							label="Shares"
							rules={['required', 'float:2']}
							value={shares}
						/>

						<CustomInput
							handleUpdateInput={(e) => setSharePrice(e.value)}
							label="Cost Per Share"
							rules={['required', 'float:2']}
							value={sharePrice}
						/>
					</div>

					<div className="bg-gray-100 flex-row flex justify-end py-2">
						<CustomButton
							handleClick={() => setAnimateCloseModal(true)}
							ignoreValidation
						>
							Cancel
						</CustomButton>
						<CustomButton
							handleClick={() => {
								const submitData: HoldingSubmitType = {
									ticker,
									shares,
									sharePrice,
								};

								handleAddHolding(submitData);
								setAnimateCloseModal(true);
							}}
							color="secondary"
							isDisabled={!isValid}
						>
							Add Holding
						</CustomButton>
					</div>
				</FormContextProvider>
			</div>
		</Modal>
	);
};

export default HoldingsModal;
