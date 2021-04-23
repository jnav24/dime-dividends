import React, { useState } from 'react';

import LoginForm from '../../components/partials/forms/LoginForm';
import TwoFactorForm from '../../components/partials/forms/TwoFactorForm';

const Login: React.FC = () => {
	const [twoFactor, setTwoFactor] = useState(false);

	return (
		<>
			{!twoFactor && (
				<LoginForm handleTwoFactor={() => setTwoFactor(true)} />
			)}
			{twoFactor && <TwoFactorForm />}
		</>
	);
};

export default Login;
