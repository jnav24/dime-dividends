import React, { useEffect, useState } from 'react';

import Modal from './Modal';
import CustomButton from '../ui-elements/form/CustomButton';
import CustomInput from '../ui-elements/form/CustomInput';
import CustomRadio from '../ui-elements/form/CustomRadio';
import CustomRadioGroup from '../ui-elements/form/CustomRadioGroup';
import FormContextProvider from '../ui-elements/form/FormContextProvider';
import {
	HoldingsModalType,
	HoldingSubmitType,
	HoldingType,
} from '../../@types/holdings';
import useCurrency from '../../hooks/useCurrency';
import useHttp from '../../hooks/useHttp';
import useTimestamp from '../../hooks/useTimestamp';

enum OrderType {
	BOUGHT = 'bought',
	SOLD = 'sold',
}

type Props = HoldingsModalType & {
	data: HoldingType;
};

const EditHoldingsModal: React.FC<Props> = ({
	data,
	handleAddHolding,
	handleShowModal,
	show,
}) => {
	const { formatDollar } = useCurrency();
	const { formatDate } = useTimestamp();
	const [animateCloseModal, setAnimateCloseModal] = useState(false);
	const [cost, setCost] = useState('');
	const [orderType, setOrderType] = useState('');
	const [quantity, setQuantity] = useState('');
	const [isValid, setIsValid] = useState(false);

	const getShares = () => {
		if (orderType === OrderType.BOUGHT) {
			return (+data.quantity + +quantity).toString();
		}

		return (
			Math.max(+data.quantity, +quantity) -
			Math.min(+data.quantity, +quantity)
		).toString();
	};

	const response = useHttp({
		initialize: false,
		method: 'get',
		path: `/real-time-prices/${data.ticker}`,
	});

	useEffect(() => {
		if (show) {
			setAnimateCloseModal(false);
			response.refetch();
		} else {
			setCost('');
			setQuantity('');
			setIsValid(false);
			response.reset();
		}
	}, [show]);

	return (
		<Modal
			handleShowModal={handleShowModal}
			show={show}
			animateCloseModal={animateCloseModal}
		>
			<div className="w-200">
				<div className="bg-gray-100 pl-2 py-2 text-2xl text-gray-700 font-header">
					Update Holding
				</div>

				<FormContextProvider
					valid={isValid}
					handleUpdateValid={setIsValid}
				>
					<div className="py-6 px-4 flex flex-row justify-between items-start">
						<div className="text-gray-600">
							<div className="mb-8">
								<h2 className="text-xl text-black">
									{data.name}
								</h2>
								<p className="text-sm">({data.ticker})</p>
							</div>
							<p>
								Next Payout Date:{' '}
								{formatDate('MM/dd/yyyy', data.next_payout_at)}
							</p>
							<p>Current Holdings: {data.quantity}</p>
							<p>
								Current Price:{' '}
								{Object.keys(response.data).length &&
									`$${formatDollar(
										response.data[0].attributes.last
									)}`}
							</p>
						</div>

						<div className="space-y-2 w-2/4">
							<CustomRadioGroup
								row
								handleRadioSelect={setOrderType}
								label="Order Type"
								defaultValue={OrderType.BOUGHT}
							>
								<CustomRadio
									label="Bought"
									value={OrderType.BOUGHT}
								/>
								<CustomRadio
									label="Sold"
									value={OrderType.SOLD}
								/>
							</CustomRadioGroup>
							<CustomInput
								handleUpdateInput={(e) => setCost(e.value)}
								rules={['required', 'float:2']}
								value={cost}
								label="Cost Per Share"
							/>
							<CustomInput
								handleUpdateInput={(e) => setQuantity(e.value)}
								rules={['required', 'float:2']}
								value={quantity}
								label="Quantity"
							/>
						</div>
					</div>

					<div className="bg-gray-100 flex-row flex justify-end py-2">
						<CustomButton
							handleClick={() => setAnimateCloseModal(true)}
							ignoreValidation
						>
							Cancel
						</CustomButton>

						<CustomButton
							color="secondary"
							handleClick={() => {
								const submitData: HoldingSubmitType = {
									id: data.id,
									ticker: data.ticker,
									shares: getShares(),
									sharePrice: cost,
								};

								handleAddHolding(submitData);
								setAnimateCloseModal(true);
							}}
							isDisabled={!isValid}
						>
							Update
						</CustomButton>
					</div>
				</FormContextProvider>
			</div>
		</Modal>
	);
};

export default EditHoldingsModal;
