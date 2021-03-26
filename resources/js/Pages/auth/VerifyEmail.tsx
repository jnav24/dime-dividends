import React, {useEffect, useState} from 'react';
import { Inertia } from '@inertiajs/inertia';

import Alert from '../../components/ui-elements/Alert';
import CustomButton from '../../components/ui-elements/form/CustomButton';
import Guest from '../layouts/Guest';
import { usePage } from '@inertiajs/inertia-react';
import { CustomProps } from '../../@types/custom-inertia';

const VerifyEmail = () => {
    const [emailErrors, setEmailErrors] = useState<string[]>([]);
	const { errors, status } = usePage().props as CustomProps;

	useEffect(() => {
	    console.log(errors);
	    setEmailErrors(Object.values(errors));
    }, [errors]);

	useEffect(() => {
	    console.log(status);
    }, [status]);

	const handleLogout = async () => {
		await Inertia.post('/logout');
	};

	const handleSendVerification = async () => {
	    // @todo create an alert on success/error. you can check the http status or data.props.status === 'verification-link-sent'
		await Inertia.post('/email/verification-notification');
	};

	return (
		<Guest>
            <Alert errors={emailErrors} type="error" />

			<h1 className="text-center text-2xl text-gray-800 sm:text-gray-600 font-header mb-4">
				Thanks for signing up!
			</h1>

			<div className="px-4 pb-4">
				<p className="text-sm text-gray-700 mb-8 text-center">
					Before getting started, could you verify your email address
					by clicking on the link we just emailed to you? If you
					didn't receive the email, we will gladly send you another.
				</p>

				<div className="space-y-2">
					<CustomButton
						block
						color="secondary"
						handleClick={handleSendVerification}
					>
						Resend Verification Email
					</CustomButton>

					<CustomButton block handleClick={handleLogout}>
						Logout
					</CustomButton>
				</div>
			</div>
		</Guest>
	);
};

export default VerifyEmail;
