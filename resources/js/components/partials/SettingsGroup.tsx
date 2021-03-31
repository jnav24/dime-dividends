import React from 'react';

import Card from '../ui-elements/card/Card';

type Props = {
	title: string;
	description: string;
};

const SettingsGroup: React.FC<Props> = ({
	children,
	description,
	title,
}) => {
	return (
		<section className="flex flex-row align-top border-b-2 mb-8 pb-8">
			<div className="pr-8">
				<h3 className="text-gray-800 font-header text-xl">{title}</h3>
				<p className="text-gray-600 text-sm">{description}</p>
			</div>
			<div className="flex-grow">
				<Card className="shadow-lg">{children}</Card>
			</div>
		</section>
	);
};

export default SettingsGroup;
