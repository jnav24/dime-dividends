import React from 'react';

import ChevronDownIcon from '../ui-elements/icons/ChevronDownIcon';
import Logo from '../../../assets/logo.png';
import UserCircleIcon from '../ui-elements/icons/UserCircleIcon';
import { usePage } from '@inertiajs/inertia-react';
import { CustomProps } from '../../@types/custom-inertia';

const TopNav = () => {
	const { user } = usePage().props as CustomProps;

	return (
		<div className="bg-primary px-4 py-3">
			<div className="container mx-auto flex flex-row items-center justify-between">
				<div className="flex flex-row items-center">
					<img src={Logo} alt="" className="h-10 crisp" />
				</div>

				<button
					type="button"
					className="flex flex-row items-center text-sm border-2 border-primary focus:outline-none transition duration-300 ease rounded-full p-2"
					id="user-menu"
					aria-label="User menu"
					aria-haspopup="true"
				>
					<span className="rounded-full bg-white">
						<UserCircleIcon className="h-6 w-6 text-primary" />
					</span>

					<span className="text-white ml-4 mr-2 my-0 ellipsis max-w-32 hidden sm:block">
						{user.name}
					</span>

					<span className="hidden sm:block">
						<ChevronDownIcon className="transform transition duration-300 h-4 w-4 text-white" />
					</span>
				</button>
			</div>
		</div>
	);
};

export default TopNav;
