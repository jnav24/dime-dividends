import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

import Alert from '../../components/ui-elements/Alert';
import CustomButton from '../../components/ui-elements/form/CustomButton';
import CustomInput from '../../components/ui-elements/form/CustomInput';
import FormContextProvider from '../../components/ui-elements/form/FormContextProvider';
import LoadingIcon from '../../components/ui-elements/icons/LoadingIcon';
import Guest from '../layouts/Guest';
import { CustomProps } from '../../@types/custom-inertia';

const ResetPassword = () => {
	const { errors, request, reset_password_token } = usePage()
		.props as CustomProps;
	const [email, setEmail] = useState(request?.email ?? '');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [resetErrors, setResetErrors] = useState<string[]>([]);

	useEffect(() => {
		setResetErrors(Object.values(errors));
	}, [errors]);

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		await Inertia.post('/reset-password', {
			email,
			password,
			password_confirmation: confirmPassword,
			token: reset_password_token,
		});
		setIsSubmitting(false);
	};

	return (
		<Guest>
			<article className="px-6 pb-6">
				<h1 className="text-center text-2xl text-gray-800 sm:text-gray-600 font-header">
					Reset Password
				</h1>

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

					<CustomButton
						block
						color="secondary"
						submit
						isDisabled={isSubmitting}
					>
						{!isSubmitting && <span>Reset Button</span>}
						{isSubmitting && (
							<LoadingIcon className="w-6 h-6 text-gray-600 animate-spin" />
						)}
					</CustomButton>
				</FormContextProvider>
			</article>
		</Guest>
	);
};

export default ResetPassword;
