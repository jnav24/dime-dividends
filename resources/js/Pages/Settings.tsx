import React, { useState } from 'react';

import Auth from './layouts/Auth';
import AuthContent from './layouts/AuthContent';
import SettingsProfile from '../components/partials/SettingsProfile';
import SettingsTwoFactor from '../components/partials/SettingsTwoFactor';
import SettingsUpdatePassword from '../components/partials/SettingsUpdatePassword';

type Props = {};

const Settings: React.FC<Props> = () => {
	return (
		<Auth>
			<AuthContent>
				<SettingsProfile />
				<SettingsUpdatePassword />
				<SettingsTwoFactor />
			</AuthContent>
		</Auth>
	);
};

export default Settings;
