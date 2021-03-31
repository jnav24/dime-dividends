import React, { useState } from 'react';

import CustomInput from '../ui-elements/form/CustomInput';
import CustomButton from '../ui-elements/form/CustomButton';
import FormContextProvider from '../ui-elements/form/FormContextProvider';
import SettingsGroup from './SettingsGroup';

type Props = {};

const SettingsUpdatePassword: React.FC<Props> = () => {
	const [confirmPassword, setConfirmPassword] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [isValid, setIsValid] = useState(false);

	return (
		<SettingsGroup
			title="Update Password"
			description="Ensure your account is using a long, random password to stay secure."
		>
			<FormContextProvider handleUpdateValid={setIsValid} valid={isValid}>
				<CustomInput
					handleUpdateInput={setCurrentPassword}
					label="Current Password"
					value={currentPassword}
                    type="password"
				/>

				<CustomInput
					handleUpdateInput={setNewPassword}
					label="New Password"
					value={newPassword}
                    type="password"
				/>

				<CustomInput
					handleUpdateInput={setConfirmPassword}
					label="Confirm Password"
					value={confirmPassword}
                    type="password"
				/>

				<CustomButton
					block
					color="secondary"
					handleClick={() => null}
					isDisabled={!isValid}
				>
					Save
				</CustomButton>
			</FormContextProvider>
		</SettingsGroup>
	);
};

export default SettingsUpdatePassword;
