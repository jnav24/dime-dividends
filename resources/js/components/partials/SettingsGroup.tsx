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
			<div>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
			<div>
				<Card>{children}</Card>
			</div>
		</section>
	);
};

export default SettingsGroup;
