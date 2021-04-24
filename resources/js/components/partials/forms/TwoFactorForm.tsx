import React, { BaseSyntheticEvent, useState } from 'react';

import Alert from '../../ui-elements/Alert';
import CustomInput from '../../ui-elements/form/CustomInput';
import Guest from '../../../Pages/layouts/Guest';
import FormContextProvider from '../../ui-elements/form/FormContextProvider';
import LoadingIcon from '../../ui-elements/icons/LoadingIcon';
import CustomButton from '../../ui-elements/form/CustomButton';
import useHttp from '../../../hooks/useHttp';
import { Inertia } from '@inertiajs/inertia';

type Props = {};

const TwoFactorForm: React.FC<Props> = () => {
    const [code, setCode] = useState('');
    const [isValid, setIsValid] = useState(false);
	const { errors, isLoading, isSuccess, refetch } = useHttp({
		enable: false,
		method: 'post',
        params: { code },
		path: 'two-factor-challenge',
	});

	const handleSubmit = (e: BaseSyntheticEvent) => {
		e.preventDefault();
		refetch();
	};

	if (isSuccess) {
		Inertia.get('/dashboard');
	}

	return (
		<Guest>
			<h1 className="text-center text-2xl text-gray-800 sm:text-gray-600 font-header mb-8">
				2-Step Auth
			</h1>

			<div className="px-4">
				<Alert errors={errors} type="error" />

				<FormContextProvider
					handleSubmit={handleSubmit}
					handleUpdateValid={setIsValid}
					valid={isValid}
				>
					<CustomInput
						handleUpdateInput={setCode}
						label="Enter 6 digit code"
						rules={['required', 'numeric', 'exact:6']}
						value={code}
					/>

					<CustomButton
						block
						color="secondary"
						submit
						isDisabled={isLoading}
					>
						{!isLoading && <span>Verify</span>}
						{isLoading && (
							<LoadingIcon className="w-6 h-6 text-gray-600 animate-spin" />
						)}
					</CustomButton>
				</FormContextProvider>
			</div>
		</Guest>
	);
};

export default TwoFactorForm;
