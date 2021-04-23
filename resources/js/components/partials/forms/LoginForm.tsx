import React, { BaseSyntheticEvent, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

import Alert from '../../ui-elements/Alert';
import CustomButton from '../../ui-elements/form/CustomButton';
import CustomCheckbox from '../../ui-elements/form/CustomCheckbox';
import CustomInput from '../../ui-elements/form/CustomInput';
import FormContextProvider from '../../ui-elements/form/FormContextProvider';
import Guest from '../../../Pages/layouts/Guest';
import LoadingIcon from '../../ui-elements/icons/LoadingIcon';
import useHttp from '../../../hooks/useHttp';

type Props = {
	handleTwoFactor: () => void;
};

const LoginForm: React.FC<Props> = ({ handleTwoFactor }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState('');
	const [isValid, setIsValid] = useState(false);
	const { data, errors, isLoading, isSuccess, refetch } = useHttp({
        method: 'post',
        path: '/login',
        params: {
            email,
            password,
            remember: rememberMe === 'checked',
        },
        enable: false,
    });

	if (isSuccess) {
	    if (data.two_factor) {
            handleTwoFactor();
        } else {
            Inertia.get('/dashboard');
        }
    }

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
        refetch();
	};

	return (
		<Guest>
			<h1 className="text-center text-2xl text-gray-800 sm:text-gray-600 font-header mb-8">
				Welcome Back
			</h1>

			<div className="px-4">
				<Alert errors={errors} type="error" />

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
						isDisabled={isLoading}
					>
						{!isLoading && <span>Login</span>}
						{isLoading && (
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
