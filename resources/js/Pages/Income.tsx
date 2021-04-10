import React from 'react';

import Auth from './layouts/Auth';
import AuthContent from './layouts/AuthContent';
import BarChart from '../components/charts/BarChart';

const Income = () => {
	return (
		<Auth>
            <AuthContent>
                <BarChart
                    labels={[
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December',
                    ]}
                    data={[{ label: 'spent', backgroundColor: 'rgba(69,173,168,0.2)', borderColor: 'rgba(69,173,168,1)', borderWidth: 1, data: [49, 38, 24, 16, 88, 36] }]}
                />
            </AuthContent>
		</Auth>
	);
};

export default Income;
