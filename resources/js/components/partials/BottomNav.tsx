import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

import CashIcon from '../ui-elements/icons/CashIcon';
import LibraryIcon from '../ui-elements/icons/LibraryIcon';

type BottomNavType = {
    type?: 'default' | 'inverted',
}

const BottomNav: React.FC<BottomNavType> = ({ type = 'default' }) => {
	const menu = [
		{ icon: <LibraryIcon className="w-5 h-5" />, label: 'Holdings', link: '/dashboard' },
		{ icon: <CashIcon className="w-5 h-5" />, label: 'Income', link: '/income' },
	];

	const getStyles = (name: string) => {
	    let styles = '';

	    if (type === 'inverted') {
            styles += `flex flex-row items-center p-2 rounded transition ease-out-in duration-300 mb-1 `;

            if (window.location.pathname === name) {
                styles += `text-white bg-dark-primary hover:bg-dark-primary hover:bg-opacity-100 `;
            } else {
                styles += `text-white hover:bg-white hover:bg-opacity-25 `;
            }
        } else {
            styles += `mr-6 flex flex-row items-center transition ease-out duration-300 py-4 `;

            if (window.location.pathname === name) {
                styles += `text-primary `;
            } else {
                styles += `text-gray-600 hover:text-primary active:text-primary `;
            }
        }

	    return styles;
    };

	return (
		<>
			<div className="bg-white shadow-sm hidden sm:block">
				<div className="container mx-auto flex flex-row">
					{menu.map((item, int) => (
						<InertiaLink
							className={getStyles(item.link)}
							href={item.link}
							key={int}
						>
							{item.icon}
							<span className="ml-2">{item.label}</span>
						</InertiaLink>
					))}
				</div>
			</div>
		</>
	);
};

export default BottomNav;
