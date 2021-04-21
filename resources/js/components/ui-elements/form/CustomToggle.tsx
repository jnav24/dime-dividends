import React from 'react';

type Props = {
    value: boolean;
    handleClick: (bool: boolean) => void;
};

const CustomToggle: React.FC<Props> = ({ value, handleClick }) => {
    return (
        <p>toggle</p>
    );
};

export default CustomToggle;
