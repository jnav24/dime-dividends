import React, { useEffect, useRef } from 'react';
import {
	Chart,
	ChartConfiguration,
	ChartDataSets,
	ChartOptions,
} from 'chart.js';

type Props = {
	labels: string[] | Array<string[]>;
	data: ChartDataSets[];
	options?: ChartOptions;
	wrapperStyles?: Record<string, string>;
};

const BarChart: React.FC<Props> = ({
	labels,
	data,
	options = {},
	wrapperStyles = {},
}) => {
	let chart;
	const chartData: ChartConfiguration = {
		type: 'bar',
		data: {
			labels,
			datasets: data,
		},
		options,
	};
	const myChart: React.MutableRefObject<null | HTMLCanvasElement> = useRef(
		null
	);

	useEffect(() => {
		chart = new Chart(myChart.current as HTMLCanvasElement, chartData);
		chart.update();
	}, []);

	return (
		<div style={wrapperStyles}>
			<canvas ref={myChart} />
		</div>
	);
};

export default BarChart;
