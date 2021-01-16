import React from 'react';

type CardType = {
    className?: string,
};

const Card: React.FC<CardType> = ({ children, className= '' }) => {
	return (
		<div className={`bg-white rounded-md shadow-sm transition duration-150 my-2 sm:my-4 ${className}`}>
			{children}
		</div>
	);
};

export default Card;
