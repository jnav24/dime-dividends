import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CustomAutocomplete from '../ui-elements/form/CustomAutocomplete';
import CustomButton from '../ui-elements/form/CustomButton';
import CustomInput from '../ui-elements/form/CustomInput';
import FormContextProvider from '../ui-elements/form/FormContextProvider';
import Modal from './Modal';

type HoldingsModalType = {
	handleAddHolding: (holding: {
		ticker: string;
		shares: string;
		sharePrice: string;
	}) => void;
	handleShowModal: (e: boolean) => void;
	quantity?: string;
	price?: string;
	show: boolean;
	tickerSymbol?: string;
};

type AutocompleteLabelType = {
	name: string;
	company: string;
};

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

const HoldingsModal: React.FC<HoldingsModalType> = ({
	handleAddHolding,
	handleShowModal,
	quantity = '',
	price = '',
	show,
	tickerSymbol = '',
}) => {
    const [editMode, setEditMode] = useState(false);
	const [tickerItems, setTickerItems] = useState([]);
	const [isValid, setIsValid] = useState(false);
	const [shares, setShares] = useState(quantity);
	const [sharePrice, setSharePrice] = useState(price);
	const [ticker, setTicker] = useState(tickerSymbol);
	const [tickerTimer, setTickerTimer] = useState<null | ReturnType<
		typeof setTimeout
	>>(null);

	useEffect(() => {
	    if (shares.trim().length || sharePrice.trim().length || ticker.trim().length) {
            setEditMode(true);
        }
    }, []);

	useEffect(() => {
		if (!show) {
			setTicker('');
			setShares('');
			setSharePrice('');
			setIsValid(false);
		}
	}, [show]);

	const handleUpdateTicker = (e: string) => {
		if (tickerTimer) {
			clearTimeout(tickerTimer);
		}

		if (e.trim().length && e.toLowerCase() !== ticker.toLowerCase()) {
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
				}, 1000)
			);
		} else {
			setTickerItems([]);
		}

		setTicker(e);
	};

	const handleSelectAutocomplete = (e: string) => {
		setTickerItems([]);
		if (e !== ticker) {
			handleUpdateTicker(e);
		}
	};

	return (
		<Modal handleShowModal={handleShowModal} show={show}>
			<div className="w-100">
				<div className="bg-gray-100 pl-2 py-2 text-2xl text-gray-700 font-header">
                    {editMode ? 'Edit' : 'Add'} Holding
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
						<CustomButton
							handleClick={() => {
								handleAddHolding({
									ticker,
									shares,
									sharePrice,
								});
								handleShowModal(false);
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
