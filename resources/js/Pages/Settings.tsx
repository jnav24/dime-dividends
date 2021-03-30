import React, { useState } from 'react';

import Auth from './layouts/Auth';
import AuthContent from './layouts/AuthContent';
import Card from '../components/ui-elements/card/Card';
import SettingsProfile from '../components/partials/SettingsProfile';

type Props = {};

const Settings: React.FC<Props> = () => {
	return (
		<Auth>
			<AuthContent>
				<Card>
					<SettingsProfile />
				</Card>
			</AuthContent>
		</Auth>
	);
};

export default Settings;
