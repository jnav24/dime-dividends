import React, { useState } from 'react';

import SettingsGroup from './SettingsGroup';
import CustomToggle from '../ui-elements/form/CustomToggle';

type Props = {};

const SettingsTwoFactor: React.FC<Props> = () => {
	const [toggleState, setToggleState] = useState(false);

	return (
		<SettingsGroup
			title="Two Factor Authentication"
			description="Add additional security to your account by using two factor authentication"
		>
			<div className="flex flex-row justify-between items-center text-gray-600 mb-2">
				<span>{toggleState ? 'Enabled' : 'Disabled'}</span>
				<CustomToggle value={toggleState} handleClick={setToggleState} />
			</div>
			<p className="text-sm text-gray-400">
				*You will need an authenticator app like Authy or Google
				Authenticator to use two factor.
			</p>
		</SettingsGroup>
	);
};

export default SettingsTwoFactor;
