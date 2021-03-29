import React, { useState } from 'react';

import ChevronDownIcon from '../ui-elements/icons/ChevronDownIcon';
import CogIcon from '../ui-elements/icons/CogIcon';
import Logo from '../../../assets/logo.png';
import LogoutIcon from '../ui-elements/icons/LogoutIcon';
import SubNavItems from './SubNavItems';
import UserCircleIcon from '../ui-elements/icons/UserCircleIcon';
import { usePage } from '@inertiajs/inertia-react';
import { CustomProps } from '../../@types/custom-inertia';

const TopNav = () => {
	const { user } = usePage().props as CustomProps;
	const [profileSelected, setProfileSelected] = useState(false);

	const menu = [
        {
            to: '/settings',
            label: 'Settings',
            method: 'get',
            icon: <CogIcon className="w-4 h-4" />,
        },
		{
			to: '/logout',
			label: 'Logout',
            method: 'post',
			icon: <LogoutIcon className="w-4 h-4" />,
		},
	];

	return (
		<div className="bg-primary px-4 py-3">
			<div className="container mx-auto flex flex-row items-center justify-between">
				<div className="flex flex-row items-center">
					<img src={Logo} alt="" className="h-10 crisp" />
				</div>

				<div className="relative z-100">
					<button
						type="button"
						className={`flex flex-row items-center text-sm border-2 ${
							!profileSelected ? 'border-primary' : 'border-white'
						} focus:outline-none transition duration-300 ease rounded-full p-2`}
						id="user-menu"
						aria-label="User menu"
						aria-haspopup="true"
						onBlur={() => setProfileSelected(false)}
						onClick={() => setProfileSelected(!profileSelected)}
					>
						<span className="rounded-full bg-white">
							<UserCircleIcon className="h-6 w-6 text-primary" />
						</span>

						<span className="text-white ml-4 mr-2 my-0 ellipsis max-w-32 hidden sm:block">
							{user.name}
						</span>

						<span className="hidden sm:block">
							<ChevronDownIcon
								className={`transform transition ${
									profileSelected ? 'rotate-180' : 'rotate-0'
								} duration-300 h-4 w-4 text-white`}
							/>
						</span>
					</button>

					<SubNavItems showNav={profileSelected} items={menu} />
				</div>
			</div>
		</div>
	);
};

export default TopNav;
