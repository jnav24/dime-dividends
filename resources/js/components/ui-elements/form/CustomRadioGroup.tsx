import React, { createContext, useEffect, useMemo, useState } from 'react';

type ContextType = {
	groupLabel: string;
	selected: string;
	setSelected: (val: string) => void;
};

type Props = {
	defaultValue?: string;
	handleRadioSelect: (val: string) => void;
	label: string;
	row?: boolean;
};

export const CustomRadioGroupContext = createContext({} as ContextType);

const CustomRadioGroup: React.FC<Props> = ({
	children,
	handleRadioSelect,
	label,
	row = false,
	defaultValue = '',
}) => {
	const [selected, setSelected] = useState('');
	const setLabel = useMemo(() => label.toLowerCase().replace(/\s+/, '-'), [
		label,
	]);

	useEffect(() => {
		setSelected(defaultValue);
	}, []);

	useEffect(() => {
	    handleRadioSelect(selected);
    }, [selected]);

	return (
		<CustomRadioGroupContext.Provider
			value={{ groupLabel: setLabel, selected, setSelected }}
		>
			<div
				role="radiogroup"
				aria-label={label}
				className={`transform -translate-x-2.5 flex ${
					row ? 'flex-row justify-start items-center' : 'flex-col'
				}`}
			>
				{children}
			</div>
		</CustomRadioGroupContext.Provider>
	);
};

export default CustomRadioGroup;
