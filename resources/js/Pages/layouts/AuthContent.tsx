import React from 'react';

type AuthContentType = {};

const AuthContent: React.FC<AuthContentType> = ({ children }) => {
	return <div className="container mx-auto py-6">{children}</div>;
};

export default AuthContent;
