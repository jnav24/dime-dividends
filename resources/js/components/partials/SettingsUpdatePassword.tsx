import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import CardActions from '../ui-elements/card/CardActions';
import CustomInput from '../ui-elements/form/CustomInput';
import CustomButton from '../ui-elements/form/CustomButton';
import FormContextProvider from '../ui-elements/form/FormContextProvider';
import InlineAlert from '../ui-elements/InlineAlert';
import SettingsGroup from './SettingsGroup';

type Props = {};

const SettingsUpdatePassword: React.FC<Props> = () => {
	const [confirmPassword, setConfirmPassword] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const handleSave = async () => {
	    try {
            setIsLoading(true);
            const response: AxiosResponse<{ success?: boolean }> = await axios.post(
                '/settings/password',
                {
                    password: newPassword,
                    password_confirmation: confirmPassword,
                    password_current: currentPassword,
                }
            );

            if (response.data.success) {
                setIsSuccess(true);
                setConfirmPassword('');
                setCurrentPassword('');
                setNewPassword('');
                setIsValid(false);
            }

            setShowAlert(true);
            setIsLoading(false);
        } catch (e) {
            setShowAlert(true);
            setIsLoading(false);
        }
	};

	return (
		<SettingsGroup
			title="Update Password"
			description="Ensure your account is using a long, random password to stay secure."
		>
			<FormContextProvider handleUpdateValid={setIsValid} valid={isValid}>
				<div className="px-4 pt-4">
					<CustomInput
						handleUpdateInput={setCurrentPassword}
						label="Current Password"
						value={currentPassword}
						type="password"
						rules={['required']}
					/>

					<CustomInput
						handleUpdateInput={setNewPassword}
						label="New Password"
						value={newPassword}
						type="password"
						rules={['required', 'min:8', 'alpha-numeric']}
					/>

					<CustomInput
						handleUpdateInput={setConfirmPassword}
						label="Confirm Password"
						value={confirmPassword}
						type="password"
						rules={['required', 'match:new-password']}
					/>
				</div>

				<CardActions>
					<InlineAlert
						show={showAlert}
						isSuccess={isSuccess}
						handleUpdateShow={setShowAlert}
					/>
					<CustomButton
						color="secondary"
						handleClick={handleSave}
						isDisabled={isLoading || !isValid}
					>
						Save
					</CustomButton>
				</CardActions>
			</FormContextProvider>
		</SettingsGroup>
	);
};

export default SettingsUpdatePassword;
