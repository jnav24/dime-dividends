import React, { useEffect, useState } from 'react';

type Props = {
	show: boolean;
	isSuccess: boolean;
    handleUpdateShow: (e: boolean) => void;
};

const InlineAlert: React.FC<Props> = ({ show, isSuccess, handleUpdateShow }) => {
    useEffect(() => {
        if (show) {
            setTimeout(() => handleUpdateShow(false), 5000);
        }
    }, [show]);

	return (
		<p
			className={`${isSuccess ? 'text-primary' : 'text-danger'} ${
				show ? 'opacity-100' : 'opacity-0'
			} mr-4 transition duration-150 ease-out-in`}
		>
			{isSuccess ? 'Saved!' : 'Error'}
		</p>
	);
};

export default InlineAlert;
