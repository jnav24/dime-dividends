import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import Alert from '../../components/ui-elements/Alert';
import CustomButton from '../../components/ui-elements/form/CustomButton';
import Guest from '../layouts/Guest';
import LoadingIcon from '../../components/ui-elements/icons/LoadingIcon';
import { usePage } from '@inertiajs/inertia-react';
import { CustomProps } from '../../@types/custom-inertia';

const VerifyEmail = () => {
	const [emailErrors, setEmailErrors] = useState<string[]>([]);
	const [errorType, setErrorType] = useState<'error' | 'success'>('error');
	const [emailSent, setEmailSent] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { status } = usePage().props as CustomProps;

	useEffect(() => {
		if (emailSent) {
			if (status === 'verification-link-sent') {
				setEmailErrors(['Email was sent successfully!']);
				setErrorType('success');
			} else {
				setEmailErrors(['Unable to send the email at this time.']);
				setErrorType('error');
			}
		}
	}, [status, emailSent]);

	const handleLogout = async () => {
		await Inertia.post('/logout');
	};

	const handleSendVerification = async () => {
		setIsSubmitting(true);
		await Inertia.post('/email/verification-notification');
		setEmailSent(true);
		setIsSubmitting(false);
	};

	return (
		<Guest>
			<div className="px-4">
				<Alert errors={emailErrors} type={errorType} />
			</div>

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
						isDisabled={isSubmitting}
					>
						{!isSubmitting && (
							<span>Resend Verification Email</span>
						)}
						{isSubmitting && (
							<LoadingIcon className="w-6 h-6 text-gray-600 animate-spin" />
						)}
					</CustomButton>

					<CustomButton
						block
						handleClick={handleLogout}
						isDisabled={isSubmitting}
					>
						{!isSubmitting && <span>Logout</span>}
						{isSubmitting && (
							<LoadingIcon className="w-6 h-6 text-gray-600 animate-spin" />
						)}
					</CustomButton>
				</div>
			</div>
		</Guest>
	);
};

export default VerifyEmail;
