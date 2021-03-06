import React, { ReactNode, useEffect, useRef } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

type SubNavItemsType = {
	items: Array<{ to: string; icon: ReactNode; label: string; method: string; }>;
	showNav: boolean;
};

const SubNavItems: React.FC<SubNavItemsType> = ({ items, showNav }) => {
    const subNavElement: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    useEffect(() => {
        if (!showNav) {
            setTimeout(
                () =>
                    subNavElement.current!.classList.add('h-0', 'py-0'),
                400
            );
        } else {
            subNavElement.current!.classList.remove('h-auto', 'py-1');
        }
    }, [showNav]);

	return (
		<div
			className={`absolute right-0 sm:right-auto ${
				showNav
					? 'translate-y-2 opacity-100'
					: 'translate-y-16 opacity-0'
			} w-32 sm:w-full overflow-hidden bg-white transition delay-100 duration-300 ease-out transform rounded-lg shadow-lg`}
            ref={subNavElement}
		>
			{items.map((item, int) => (
			    <div key={int}>
                    {item.method !== 'post' && (
                        <InertiaLink
                            href={item.to}
                            className="px-2 py-3 flex flex-row justify-start items-center text-sm text-gray-600 hover:bg-gray-200"
                        >
                            {item.icon}
                            <span className="ml-2">{item.label}</span>
                        </InertiaLink>
                    )}

                    {item.method === 'post' && (
                        <button
                            type="button"
                            className="px-2 py-3 flex flex-row justify-start items-center text-sm text-gray-600 hover:bg-gray-200 w-full"
                            onClick={() => {
                                Inertia.post(item.to);
                            }}
                        >
                            {item.icon}
                            <span className="ml-2">{item.label}</span>
                        </button>
                    )}
                </div>
			))}
		</div>
	);
};

export default SubNavItems;
