import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

import Alert from '../../components/ui-elements/Alert';
import CustomButton from '../../components/ui-elements/form/CustomButton';
import CustomCheckbox from '../../components/ui-elements/form/CustomCheckbox';
import CustomInput from '../../components/ui-elements/form/CustomInput';
import FormContextProvider from '../../components/ui-elements/form/FormContextProvider';
import Guest from '../layouts/Guest';
import { CustomProps } from '../../@types/custom-inertia';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [loginErrors, setLoginErrors] = useState<string[]>([]);
	const { errors } = usePage().props as CustomProps;

	useEffect(() => {
		setLoginErrors(Object.values(errors));
	}, [errors]);

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		await Inertia.post('/login', {
			email,
			password,
			remember: rememberMe === 'checked',
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
						handleUpdateInput={setEmail}
						label="Email"
						rules={['required', 'email']}
						value={email}
					/>

					<CustomInput
						handleUpdateInput={setPassword}
						label="Password"
						rules={['required']}
						type="password"
						value={password}
					/>

					<div className="my-4">
						<CustomCheckbox
							handleUpdateInput={setRememberMe}
							label="Remember me"
							checked={rememberMe}
						/>
					</div>

					<CustomButton block color="secondary" submit>
						Login
					</CustomButton>
				</FormContextProvider>
			</div>

			<div className="mt-6 py-4 px-4 sm:bg-gray-100 flex flex-row justify-center sm:justify-between items-center">
				<InertiaLink
					className="text-gray-700 underline text-sm hover:no-underline"
					href="/register"
				>
					Not Registered?
				</InertiaLink>

				<InertiaLink
					className="text-gray-700 underline text-sm hover:no-underline"
					href="/forgot-password"
				>
					Forgot your password?
				</InertiaLink>
			</div>
		</Guest>
	);
};

export default Login;
