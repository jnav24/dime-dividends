import React, { BaseSyntheticEvent, useState } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Alert from '../../ui-elements/Alert';
import CustomButton from '../../ui-elements/form/CustomButton';
import CustomCheckbox from '../../ui-elements/form/CustomCheckbox';
import CustomInput from '../../ui-elements/form/CustomInput';
import FormContextProvider from '../../ui-elements/form/FormContextProvider';
import LoadingIcon from '../../ui-elements/icons/LoadingIcon';
import Guest from '../../../Pages/layouts/Guest';

type Props = {
    handleTwoFactor: () => void,
};

const LoginForm: React.FC<Props> = ({ handleTwoFactor }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [loginErrors, setLoginErrors] = useState<string[]>([]);

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		try {
			e.preventDefault();
			setIsSubmitting(true);
			const {
				status,
				data: { two_factor },
			} = await axios({
				method: 'post',
				data: {
					email,
					password,
					remember: rememberMe === 'checked',
				},
				url: '/login',
				withCredentials: true,
			});

			if (status === 200) {
				if (two_factor) {
                    handleTwoFactor();
				} else {
					await Inertia.get('/dashboard');
				}
			}
		} catch (err) {
			const { data } = err.response;
			if (data?.errors) {
				setLoginErrors(Object.values(data.errors));
			} else {
				setLoginErrors(['Something unexpected had occurred.']);
			}
		} finally {
			setIsSubmitting(false);
		}
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

					<CustomButton
						block
						color="secondary"
						submit
						isDisabled={isSubmitting}
					>
						{!isSubmitting && <span>Login</span>}
						{isSubmitting && (
							<LoadingIcon className="w-6 h-6 text-gray-600 animate-spin" />
						)}
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

export default LoginForm;
