import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';

import CardActions from '../ui-elements/card/CardActions';
import { CustomProps } from '../../@types/custom-inertia';
import CustomInput from '../ui-elements/form/CustomInput';
import CustomButton from '../ui-elements/form/CustomButton';
import FormContextProvider from '../ui-elements/form/FormContextProvider';
import InlineAlert from '../ui-elements/InlineAlert';
import SettingsGroup from './SettingsGroup';
import useHttp from '../../hooks/useHttp';
import { Inertia } from '@inertiajs/inertia';
import { HttpError } from '../../@types/http-responses';

type Props = {};

const SettingsProfile: React.FC<Props> = () => {
	const { user } = usePage().props as CustomProps;
	const [email, setEmail] = useState(user.email);
	const [fullName, setFullName] = useState(user.name);
	const [isValid, setIsValid] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const { errors, isError, isLoading, isSuccess, refetch, reset } = useHttp({
		initialize: false,
		method: 'post',
		path: '/settings/profile',
		params: {
			name: fullName,
			email,
		},
	});

	const handleSave = () => {
		reset();
		refetch();
	};

	useEffect(() => {
		if (isSuccess) {
			setIsValid(false);
		}

		if ((isSuccess || isError) && !showAlert) {
			setShowAlert(true);
		}
	}, [isError, isSuccess]);

	if (errors.includes(HttpError.PASSWORD_CONFIRM)) {
		Inertia.get('/settings');
	}

	return (
		<SettingsGroup
			title="Profile Information"
			description="Update your account's profile information and email address."
		>
			<FormContextProvider handleUpdateValid={setIsValid} valid={isValid}>
				<div className="px-4 pt-4">
					<CustomInput
						handleUpdateInput={(e) => setFullName(e.value)}
						label="Full Name"
						rules={['required']}
						value={fullName}
					/>

					<CustomInput
						handleUpdateInput={(e) => setEmail(e.value)}
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
