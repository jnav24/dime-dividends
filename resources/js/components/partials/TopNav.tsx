import React from 'react';

// @ts-ignore
import Logo from '../../../assets/logo.png';

const TopNav = () => {
    return (
        <div
            className="bg-primary px-4 py-1 h-16 flex flex-row items-center relative"
        >
            <div
                className="container mx-auto flex flex-row items-center justify-between"
            >
                <div className="flex flex-row items-center">
                    <img src={Logo} alt="" className="h-10 crisp" />
                </div>
            </div>
        </div>
    );
};

export default TopNav;
