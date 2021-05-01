import React, { createContext, useMemo, useState } from 'react';

type ContextType = {
	groupLabel: string;
	selected: string;
	setSelected: (val: string) => void;
};

type Props = {
	label: string;
};

export const CustomRadioGroupContext = createContext({} as ContextType);

const CustomRadioGroup: React.FC<Props> = ({ children, label }) => {
	const [selected, setSelected] = useState('');
	const setLabel = useMemo(() => label.toLowerCase().replace(/\s+/, '-'), [
		label,
	]);

	return (
		<CustomRadioGroupContext.Provider
			value={{ groupLabel: setLabel, selected, setSelected }}
		>
			<div role="radiogroup" aria-label={label}>
				{children}
			</div>
		</CustomRadioGroupContext.Provider>
	);
};

export default CustomRadioGroup;
