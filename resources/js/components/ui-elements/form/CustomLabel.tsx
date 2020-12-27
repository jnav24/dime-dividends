import React from 'react';

type CustomLabelProps = {
	error: string | null;
	label: string;
	labelId: string;
};

const CustomLabel: React.FC<CustomLabelProps> = ({ error, label, labelId }) => {
	return (
		<label
			htmlFor={labelId}
			className={`text-sm ${!error ? 'text-gray-400' : 'text-red-600'}`}
		>
			{label}
		</label>
	);
};

export default CustomLabel;
