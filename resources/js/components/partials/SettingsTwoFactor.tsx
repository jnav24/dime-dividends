import React, { useEffect, useState } from 'react';

import SettingsGroup from './SettingsGroup';
import CustomToggle from '../ui-elements/form/CustomToggle';
import LoadingIcon from '../ui-elements/icons/LoadingIcon';
import useHttp from '../../hooks/useHttp';
import { usePage } from '@inertiajs/inertia-react';
import { CustomProps } from '../../@types/custom-inertia';

type Props = {};

const SettingsTwoFactor: React.FC<Props> = () => {
	const { user } = usePage().props as CustomProps;
	const [toggleState, setToggleState] = useState(false);

	const disableTwoFactor = useHttp({
		initialize: false,
		method: 'delete',
		path: '/user/two-factor-authentication',
	});

	const enableTwoFactor = useHttp({
		initialize: false,
		method: 'post',
		path: '/user/two-factor-authentication',
	});

	const getTwoFactor = useHttp({
		initialize: false,
		method: 'get',
		path: '/user/two-factor-qr-code',
	});

	const { qr_code, recovery_codes } = getTwoFactor.data;

	useEffect(() => {
		setToggleState(user.mfa_enabled);
	}, [user]);

	const handleToggleClick = (e: boolean) => {
        setToggleState(e);
		if (e) {
		    disableTwoFactor.reset();
			enableTwoFactor.refetch();
		} else {
		    enableTwoFactor.reset();
			disableTwoFactor.refetch();
		}
	};

    if (!enableTwoFactor.isLoading && enableTwoFactor.isSuccess) {
        getTwoFactor.refetch();
    }

	return (
		<SettingsGroup
			title="Two Factor Authentication"
			description="Add additional security to your account by using two factor authentication"
		>
			<div className="p-4">
				<div className="flex flex-row justify-between items-center text-gray-600 mb-2">
					<span>{toggleState ? 'Enabled' : 'Disabled'}</span>
					<CustomToggle
						value={toggleState}
						handleClick={handleToggleClick}
					/>
				</div>
				<p className="text-sm text-gray-400">
					*You will need an authenticator app like Authy or Google
					Authenticator to use two factor.
				</p>
                {getTwoFactor.isLoading && (
                    <div className="flex-row flex justify-center pt-4">
                        <LoadingIcon className="w-6 h-6 text-gray-600 animate-spin" />
                    </div>
                )}
				<div className={`${qr_code || recovery_codes ? 'border-t border-gray-300 mt-4 pt-4' : ''}`}>
					{qr_code && !!qr_code?.svg.length && (
						<>
							<p className="text-danger text-sm">
								Note: The information below will only be shown
								once.
							</p>
							<div className="flex flex-row mt-4 mb-8">
								<div className="text-gray-700 text-sm mr-4 space-y-4">
									<p>
										Two factor authentication is now
										enabled. Scan the following QR Code
										using your phone's authenticator
										application.
									</p>
									<p>
										While two factor authentication is
										enabled, you will be prompted for a
										secure random token during
										authentication. You may retrieve this
										token from your phone's Google
										Authenticator app.
									</p>
								</div>
                                <div dangerouslySetInnerHTML={{ __html: qr_code.svg }} />
							</div>
						</>
					)}
					{recovery_codes && !!recovery_codes.length && (
						<>
							<div>
								<p className="text-gray-700 text-sm mb-2">
									Store these recovery codes in a secure
									password manager. They can be used to
									recover access to your account if your two
									factor authentication device is lost.
								</p>
								<div className="flex flex-row justify-between text-gray-700 bg-gray-200 border border-gray-300 py-2 pl-8 pr-4">
									{[1, 2].map((v, i) => (
										<ul key={i}>
											{[...JSON.parse(recovery_codes)]
												.splice(i * 4, v * 4)
												.map((code, int) => (
													<li
														className="list-disc mb-2 text-sm"
														key={int}
													>
														{code}
													</li>
												))}
										</ul>
									))}
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</SettingsGroup>
	);
};

export default SettingsTwoFactor;
