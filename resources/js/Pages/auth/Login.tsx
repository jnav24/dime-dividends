import React, { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react'

// @ts-ignore
import Guest from '@/Pages/layouts/Guest';
import CustomButton from '../../components/ui-elements/form/CustomButton';
import CustomCheckbox from '../../components/ui-elements/form/CustomCheckbox';
import CustomInput from '../../components/ui-elements/form/CustomInput';
import FormContextProvider from '../../components/ui-elements/form/FormContextProvider';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isValid, setIsValid] = useState(false);

	return (
		<Guest>
			<h1 className="text-center text-2xl text-gray-800 sm:text-gray-600 font-header mb-8">
				Welcome Back
			</h1>

            <div className="px-4">
                <FormContextProvider handleUpdateValid={setIsValid} valid={isValid}>
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
                            handleUpdateInput={() => console.log('checked')}
                            label="Remember me"
                            value="akdk"
                        />
                    </div>

                    <CustomButton
                        block
                        color="secondary"
                        handleClick={() => console.log('peace')}
                    >
                        Login
                    </CustomButton>
                </FormContextProvider>
            </div>

            <div
                className="mt-6 py-4 px-4 sm:bg-gray-100 flex flex-row justify-center sm:justify-between items-center"
            >
                <InertiaLink
                    className="text-gray-700 underline text-sm hover:no-underline"
                    href="/register">
                    Not Registered?
                </InertiaLink>

                <InertiaLink
                    className="text-gray-700 underline text-sm hover:no-underline"
                    href="/forgot-password">
                    Forgot your password?
                </InertiaLink>
            </div>
		</Guest>
	);
};

export default Login;
