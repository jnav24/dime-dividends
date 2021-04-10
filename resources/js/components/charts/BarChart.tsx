import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, ChartDataSets } from 'chart.js';


type Props = {
	labels: string[];
	data: ChartDataSets[];
};

const BarChart: React.FC<Props> = ({ labels, data }) => {
	let chart;
	const chartData: ChartConfiguration = {
		type: 'bar',
		data: {
			labels,
			datasets: data,
		},
		options: {
            legend: {
                display: false
            },
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
						},
					},
				],
			},
            tooltips: {
                enabled: false,
            },
		},
	};
	const myChart: React.MutableRefObject<null | HTMLCanvasElement> = useRef(
		null
	);

	useEffect(() => {
		chart = new Chart(myChart.current as HTMLCanvasElement, chartData);
		chart.update();
	}, []);

	return <canvas ref={myChart} />;
};

export default BarChart;
