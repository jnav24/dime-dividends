import React, {useState} from 'react';

// @ts-ignore
import Guest from '@/Pages/layouts/Guest';
import CustomInput from '../../components/ui-elements/form/CustomInput';
import FormContextProvider from '../../components/ui-elements/form/FormContextProvider';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);

    return (
        <Guest>
            <h1
                className="text-center text-2xl text-gray-800 sm:text-gray-600 font-header mb-8"
            >
                Welcome Back
            </h1>

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
            </FormContextProvider>
        </Guest>
    );
};

export default Login;
