import React, { useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';

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
			title="Profile"
			description="This is your profile sections"
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

export default SettingsProfile;
