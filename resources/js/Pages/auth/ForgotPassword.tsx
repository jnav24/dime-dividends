import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import Guest from '../layouts/Guest';
import Alert from '../../components/ui-elements/Alert';
import CustomButton from '../../components/ui-elements/form/CustomButton';
import CustomInput from '../../components/ui-elements/form/CustomInput';
import FormContextProvider from '../../components/ui-elements/form/FormContextProvider';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { CustomProps } from '../../@types/custom-inertia';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [responseErrors, setResponseErrors] = useState<string[]>([]);
	const [isValid, setIsValid] = useState(false);
	const [errorType, setErrorType] = useState<'error' | 'success'>('error');
	const { errors, status } = usePage().props as CustomProps;

	useEffect(() => {
		if (Object.values(errors).length) {
            setResponseErrors(Object.values(errors));
            setErrorType('error');
        }

		if (status.length) {
            setResponseErrors([status]);
            setErrorType('success');
        }
	}, [errors, status]);

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		await Inertia.post('/forgot-password', {
			email,
		});
	};

	return (
		<Guest>
			<div className="px-6 pb-6">
				<h1 className="text-center text-2xl text-gray-800 sm:text-gray-600 font-header">
					Forgot Password?
				</h1>

				<p className="text-sm text-center text-gray-600 mb-8">
					Enter your email and we will send you a link with
					instructions on resetting your password.
				</p>

				<Alert errors={responseErrors} type={errorType} />

				<FormContextProvider
					handleSubmit={handleSubmit}
					handleUpdateValid={setIsValid}
					valid={isValid}
				>
					<CustomInput
						handleUpdateInput={setEmail}
						label="Email"
						rules={['required', 'email']}
						value={email}
					/>

					<CustomButton block color="secondary" submit>
						Email Password Reset Link
					</CustomButton>
				</FormContextProvider>
			</div>

			<div className="mt-6 py-4 px-4 sm:bg-gray-100 flex flex-row justify-center sm:justify-end items-center">
				<InertiaLink
					className="text-gray-700 underline text-sm hover:no-underline"
					href="/login"
				>
					Back to Login
				</InertiaLink>
			</div>
		</Guest>
	);
};

export default ForgotPassword;
