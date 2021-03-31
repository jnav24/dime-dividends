import React, { useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';

import CardActions from '../ui-elements/card/CardActions';
import { CustomProps } from '../../@types/custom-inertia';
import CustomInput from '../ui-elements/form/CustomInput';
import CustomButton from '../ui-elements/form/CustomButton';
import FormContextProvider from '../ui-elements/form/FormContextProvider';
import SettingsGroup from './SettingsGroup';

type Props = {};

const SettingsProfile: React.FC<Props> = () => {
	const { user } = usePage().props as CustomProps;
	const [email, setEmail] = useState(user.email);
	const [fullName, setFullName] = useState(user.name);
	const [isValid, setIsValid] = useState(false);

	return (
		<SettingsGroup
			title="Profile Information"
			description="Update your account's profile information and email address."
		>
			<FormContextProvider handleUpdateValid={setIsValid} valid={isValid}>
				<CustomInput
					handleUpdateInput={setFullName}
					label="Full Name"
					value={fullName}
				/>

				<CustomInput
					handleUpdateInput={setEmail}
					label="Email"
					value={email}
				/>

				<CardActions>
					<CustomButton
						block
						color="secondary"
						handleClick={() => null}
						isDisabled={!isValid}
					>
						Save
					</CustomButton>
				</CardActions>
			</FormContextProvider>
		</SettingsGroup>
	);
};

export default SettingsProfile;
