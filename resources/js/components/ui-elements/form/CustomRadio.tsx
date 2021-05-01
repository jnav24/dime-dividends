import React, { useContext } from 'react';

import { CustomRadioGroupContext } from './CustomRadioGroup';

type Props = {
	label: string;
	value: string;
};

const CustomRadio: React.FC<Props> = ({ label, value }) => {
	const { groupLabel, selected, setSelected } = useContext(
		CustomRadioGroupContext
	);

	return (
		<label className="flex flex-row justify-items-start cursor-pointer items-center mr-2">
			<div className="relative">
				<input
					className="inset-0 absolute h-full w-full opacity-0"
                    checked={selected === value}
					type="radio"
					value={value}
					name={groupLabel}
					onChange={(e) => setSelected(e.target.value)}
				/>
				<div className="hover:bg-opacity-30 hover:bg-gray-600 p-2 rounded-full transition duration-100">
					<div
						className={`border-2 border-gray-600 rounded-full w-6 h-6 flex flex-row items-center justify-center`}
					>
						{selected === value && (
							<div className="bg-gray-600 w-4 h-4 rounded-full" />
						)}
					</div>
				</div>
			</div>
			<span className="text-gray-500">{label}</span>
		</label>
	);
};

export default CustomRadio;
