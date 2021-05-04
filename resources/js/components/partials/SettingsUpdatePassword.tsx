import React, { useEffect, useState } from 'react';

import CardActions from '../ui-elements/card/CardActions';
import CustomInput from '../ui-elements/form/CustomInput';
import CustomButton from '../ui-elements/form/CustomButton';
import FormContextProvider from '../ui-elements/form/FormContextProvider';
import InlineAlert from '../ui-elements/InlineAlert';
import SettingsGroup from './SettingsGroup';
import useHttp from '../../hooks/useHttp';
import { Inertia } from '@inertiajs/inertia';
import { HttpError } from '../../@types/http-responses';

type Props = {};

const SettingsUpdatePassword: React.FC<Props> = () => {
	const [confirmPassword, setConfirmPassword] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const { errors, isError, isLoading, isSuccess, refetch, reset } = useHttp({
		initialize: false,
		method: 'post',
		path: '/settings/password',
		params: {
			password: newPassword,
			password_confirmation: confirmPassword,
			password_current: currentPassword,
		},
	});

	useEffect(() => {
		if (isSuccess) {
			setConfirmPassword('');
			setCurrentPassword('');
			setNewPassword('');
			setIsValid(false);
		}

		if ((isSuccess || isError) && !showAlert) {
			setShowAlert(true);
		}
	}, [isError, isSuccess]);

	if (errors.includes(HttpError.PASSWORD_CONFIRM)) {
		Inertia.get('/settings');
	}

	const handleSave = () => {
		reset();
		refetch();
	};

	return (
		<SettingsGroup
			title="Update Password"
			description="Ensure your account is using a long, random password to stay secure."
		>
			<FormContextProvider handleUpdateValid={setIsValid} valid={isValid}>
				<div className="px-4 pt-4">
					<CustomInput
						handleUpdateInput={(e) => setCurrentPassword(e.value)}
						label="Current Password"
						value={currentPassword}
						type="password"
						rules={['required']}
					/>

					<CustomInput
						handleUpdateInput={(e) => setNewPassword(e.value)}
						label="New Password"
						value={newPassword}
						type="password"
						rules={['required', 'min:8', 'alpha-numeric']}
					/>

					<CustomInput
						handleUpdateInput={(e) => setConfirmPassword(e.value)}
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
