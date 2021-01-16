import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import Auth from '../layouts/Auth';
import AuthContent from '../layouts/AuthContent';
import Alert from '../../components/ui-elements/Alert';
import Card from '../../components/ui-elements/card/Card';
import CustomButton from '../../components/ui-elements/form/CustomButton';
import CustomInput from '../../components/ui-elements/form/CustomInput';
import FormContextProvider from '../../components/ui-elements/form/FormContextProvider';
import { usePage } from '@inertiajs/inertia-react';
import { CustomProps } from '../../@types/custom-inertia';

const ConfirmPassword = () => {
	const [isValid, setIsValid] = useState(false);
	const [loginErrors, setLoginErrors] = useState<string[]>([]);
	const [password, setPassword] = useState('');
	const { errors } = usePage().props as CustomProps;

	useEffect(() => {
		setLoginErrors(Object.values(errors));
	}, [errors]);

	const handleSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		await Inertia.post('/confirm-password', {
			password,
		});
	};

	return (
		<Auth>
			<AuthContent>
				<div className="flex flex-col items-center">
                    <h1 className="text-2xl text-gray-800 sm:text-gray-600 font-header mb-6 mt-12">
                        Confirm password to continue
                    </h1>

                    <p className="text-sm text-center text-gray-600 mb-8 w-100">
                        This is a secure area of the application. Please confirm
                        your password before continuing.
                    </p>

                    <Card className="w-100 p-4">
                        <Alert errors={loginErrors} type="error" />

                        <FormContextProvider
                            valid={isValid}
                            handleSubmit={handleSubmit}
                            handleUpdateValid={setIsValid}
                        >
                            <CustomInput
                                handleUpdateInput={setPassword}
                                label="Password"
                                rules={['required']}
                                type="password"
                                value={password}
                            />

                            <CustomButton submit color="secondary">
                                Confirm
                            </CustomButton>
                        </FormContextProvider>
                    </Card>
                </div>
			</AuthContent>
		</Auth>
	);
};

export default ConfirmPassword;
