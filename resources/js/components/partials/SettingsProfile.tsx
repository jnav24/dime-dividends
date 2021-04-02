import React, { useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';

import CardActions from '../ui-elements/card/CardActions';
import { CustomProps } from '../../@types/custom-inertia';
import CustomInput from '../ui-elements/form/CustomInput';
import CustomButton from '../ui-elements/form/CustomButton';
import FormContextProvider from '../ui-elements/form/FormContextProvider';
import InlineAlert from '../ui-elements/InlineAlert';
import SettingsGroup from './SettingsGroup';
import axios, { AxiosResponse } from 'axios';

type Props = {};

const SettingsProfile: React.FC<Props> = () => {
	const { user } = usePage().props as CustomProps;
	const [email, setEmail] = useState(user.email);
	const [fullName, setFullName] = useState(user.name);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const handleSave = async () => {
		try {
			setIsLoading(true);
			const response: AxiosResponse<{
				success?: boolean;
			}> = await axios.post('/settings/profile', {
				name: fullName,
				email,
			});

			if (response.data.success) {
				setIsSuccess(true);
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
			title="Profile Information"
			description="Update your account's profile information and email address."
		>
			<FormContextProvider handleUpdateValid={setIsValid} valid={isValid}>
				<div className="px-4 pt-4">
					<CustomInput
						handleUpdateInput={setFullName}
						label="Full Name"
						rules={['required']}
						value={fullName}
					/>

					<CustomInput
						handleUpdateInput={setEmail}
						label="Email"
						rules={['required', 'email']}
						value={email}
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

export default SettingsProfile;
