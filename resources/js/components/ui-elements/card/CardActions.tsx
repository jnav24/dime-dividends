import React from 'react';

type Props = {};

const CardActions: React.FC<Props> = ({ children }) => {
	return (
		<div className="mt-6 py-4 px-4 sm:bg-gray-100 flex flex-row justify-center sm:justify-end items-center">
			{children}
		</div>
	);
};

export default CardActions;
