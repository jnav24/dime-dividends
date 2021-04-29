import React from 'react';

type Props = {
	value: boolean;
	handleClick: (bool: boolean) => void;
};

const CustomToggle: React.FC<Props> = ({ value, handleClick }) => {
	return (
		<button
			onClick={() => handleClick(!value)}
			className={`rounded-full w-16 shadow-inner focus:outline-none text-left border transition-all duration-100 ease-in-out ${
				value
					? 'border-primary bg-primary bg-opacity-50 border-opacity-50'
					: 'border-gray-200 bg-gray-200'
			}`}
			style={{ height: '2.15rem' }}
			type="button"
		>
			<span
				className={`inline-block rounded-full bg-white w-8 h-8 transition duration-100 ease-in-out transform ${
					value ? 'translate-x-9/10' : 'translate-x-0'
				}`}
			/>
		</button>
	);
};

export default CustomToggle;
