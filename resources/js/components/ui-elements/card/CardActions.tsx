import React from 'react';

type Props = {};

const CardActions: React.FC<Props> = ({ children }) => {
	return (
		<div className="mt-6 py-4 px-4 sm:bg-gray-200 flex flex-row justify-center sm:justify-end items-center rounded-b-md">
			{children}
		</div>
	);
};

export default CardActions;
