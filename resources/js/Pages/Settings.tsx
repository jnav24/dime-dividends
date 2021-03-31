import React, { useState } from 'react';

import Auth from './layouts/Auth';
import AuthContent from './layouts/AuthContent';
import SettingsProfile from '../components/partials/SettingsProfile';

type Props = {};

const Settings: React.FC<Props> = () => {
	return (
		<Auth>
			<AuthContent>
				<SettingsProfile />
			</AuthContent>
		</Auth>
	);
};

export default Settings;
