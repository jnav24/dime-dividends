import React, { ReactNode, useEffect, useRef } from 'react';

import CustomInput from './CustomInput';

type CustomAutocompleteType = {
	handleSelectAutocomplete: (value: string) => void;
	handleUpdateInput: (value: string) => void;
	items: Array<{ label: string | ReactNode; value: string }>;
	label: string;
	rules?: Record<string, string> | string[];
	value: string;
	readOnly?: boolean;
};

const CustomAutocomplete: React.FC<CustomAutocompleteType> = ({
	handleSelectAutocomplete,
	handleUpdateInput,
	items,
	label,
	rules,
	value,
	readOnly = false,
}) => {
	const autocompleteElement: React.MutableRefObject<null | HTMLDivElement> = useRef(
		null
	);

	useEffect(() => {
		if (!items.length) {
			setTimeout(
				() => autocompleteElement.current!.classList.add('h-0', 'py-0'),
				400
			);
		} else {
			autocompleteElement.current!.classList.remove('h-auto', 'py-1');
		}
	}, [items]);

	return (
		<div className="relative">
			<CustomInput
				handleUpdateInput={handleUpdateInput}
				label={label}
				onBlur={false}
				rules={rules}
				value={value}
				readOnly={readOnly}
			/>

			<div
				className={`bg-white border border-gray-300 shadow-sm absolute transform top-6 left-0 rounded w-full ${
					items.length
						? 'translate-y-12 opacity-100'
						: 'translate-y-0 opacity-0'
				} transition ease-out duration-300 max-h-48 overflow-y-auto`}
				ref={autocompleteElement}
			>
				{items.map((item, int) => (
					<div
						className="hover:bg-gray-200 p-2"
						key={int}
						onClick={() => handleSelectAutocomplete(item.value)}
					>
						{item.label}
					</div>
				))}
			</div>
		</div>
	);
};

export default CustomAutocomplete;
