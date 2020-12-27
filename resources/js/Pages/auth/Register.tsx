import React, { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

// @ts-ignore
import Guest from '@/Pages/layouts/Guest';
import CustomButton from '../../components/ui-elements/form/CustomButton';
import CustomInput from '../../components/ui-elements/form/CustomInput';
import FormContextProvider from '../../components/ui-elements/form/FormContextProvider';

const Register = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
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
                        handleUpdateInput={setName}
                        label="Name"
                        rules={['required']}
                        value={name}
                    />

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

                    <CustomInput
                        handleUpdateInput={setConfirmPassword}
                        label="Confirm Password"
                        rules={['required']}
                        type="password"
                        value={confirmPassword}
                    />

                    <CustomButton
                        block
                        color="secondary"
                        handleClick={() => console.log('peace')}
                    >
                        Register
                    </CustomButton>
                </FormContextProvider>
            </div>

            <div
                className="mt-6 py-4 px-4 sm:bg-gray-100 flex flex-row justify-center sm:justify-end items-center"
            >
                <InertiaLink
                    className="text-gray-700 underline text-sm hover:no-underline"
                    href="/login">
                    Already registered?
                </InertiaLink>
            </div>
        </Guest>
    );
};

export default Register;
