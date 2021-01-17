import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

import Alert from '../../components/ui-elements/Alert';
import CustomButton from '../../components/ui-elements/form/CustomButton';
import CustomInput from '../../components/ui-elements/form/CustomInput';
import FormContextProvider from '../../components/ui-elements/form/FormContextProvider';
import Guest from '../layouts/Guest';
import { CustomProps } from '../../@types/custom-inertia';

const ResetPassword = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [resetErrors, setResetErrors] = useState<string[]>([]);
	const { errors } = usePage().props as CustomProps;

	useEffect(() => {
		setResetErrors(Object.values(errors));
	}, [errors]);

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		await Inertia.post('/reset-password', {
			email,
			password,
			password_confirmation: confirmPassword,
		});
	};

	return (
		<Guest>
			<h1>ResetPassword</h1>

			<div className="px-4">
				<Alert errors={resetErrors} type="error" />

				<FormContextProvider
					valid={isValid}
					handleSubmit={handleSubmit}
					handleUpdateValid={setIsValid}
				>
					<CustomInput
						label="email"
						rules={['required', 'email']}
						value={email}
						handleUpdateInput={setEmail}
					/>

					<CustomInput
						label="Password"
						rules={['required', 'min:8']}
						type="password"
						value={password}
						handleUpdateInput={setPassword}
					/>

					<CustomInput
						label="Confirm Password"
						rules={['required', 'match:password']}
						type="password"
						value={confirmPassword}
						handleUpdateInput={setConfirmPassword}
					/>

					<CustomButton block color="secondary" submit>
						Reset Button
					</CustomButton>
				</FormContextProvider>
			</div>
		</Guest>
	);
};

export default ResetPassword;
