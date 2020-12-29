import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

import Alert from '../../components/ui-elements/Alert';
import Guest from '../layouts/Guest';
import CustomButton from '../../components/ui-elements/form/CustomButton';
import CustomInput from '../../components/ui-elements/form/CustomInput';
import FormContextProvider from '../../components/ui-elements/form/FormContextProvider';
import { CustomProps } from '../../@types/custom-inertia';
import { Inertia } from '@inertiajs/inertia';

const Register = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [password, setPassword] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [loginErrors, setLoginErrors] = useState<string[]>([]);
	const { errors, csrf_token } = usePage().props as CustomProps;

	useEffect(() => {
		setLoginErrors(Object.values(errors));
	}, [errors]);

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		await Inertia.post('/register', {
			email,
			name,
			password,
			password_confirmation: confirmPassword,
			_token: csrf_token,
		});
	};

	return (
		<Guest>
			<h1 className="text-center text-2xl text-gray-800 sm:text-gray-600 font-header mb-8">
				Welcome Back
			</h1>

			<div className="px-4">
				<Alert errors={loginErrors} type="error" />

				<FormContextProvider
					handleSubmit={handleSubmit}
					handleUpdateValid={setIsValid}
					valid={isValid}
				>
					<CustomInput
						handleUpdateInput={setName}
						label="Name"
						rules={['required', 'max:255']}
						value={name}
					/>

					<CustomInput
						handleUpdateInput={setEmail}
						label="Email"
						rules={['required', 'email', 'max:255']}
						value={email}
					/>

					<CustomInput
						handleUpdateInput={setPassword}
						label="Password"
						rules={['required', 'min:8']}
						type="password"
						value={password}
					/>

					<CustomInput
						handleUpdateInput={setConfirmPassword}
						label="Confirm Password"
						rules={['required', 'match:password']}
						type="password"
						value={confirmPassword}
					/>

					<CustomButton block color="secondary" submit>
						Register
					</CustomButton>
				</FormContextProvider>
			</div>

			<div className="mt-6 py-4 px-4 sm:bg-gray-100 flex flex-row justify-center sm:justify-end items-center">
				<InertiaLink
					className="text-gray-700 underline text-sm hover:no-underline"
					href="/login"
				>
					Already registered?
				</InertiaLink>
			</div>
		</Guest>
	);
};

export default Register;
