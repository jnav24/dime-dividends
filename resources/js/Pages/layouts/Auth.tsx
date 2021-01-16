import React from 'react';

import BottomNav from '../../components/partials/BottomNav';
import TopNav from '../../components/partials/TopNav';

type AuthType = {}

const Auth: React.FC<AuthType> = ({ children }) => {
    return (
        <>
            <TopNav />
            <BottomNav />

            <div className="bg-gray-100 h-screen overflow-y-auto pb-32">
                {children}
            </div>
        </>
    );
};

export default Auth;
