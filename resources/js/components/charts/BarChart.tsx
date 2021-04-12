import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, ChartDataSets } from 'chart.js';

type Props = {
	labels: string[] | Array<string[]>;
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
		    animation: {
		        duration: 1000,
                onComplete(chart: any) {
		            const chartValues = chart.chart.data.datasets[0].data;
		            const ctx = chart.chart.ctx;
		            ctx.font = Chart.helpers.fontString(18, 'bold', Chart.defaults.global.defaultFontFamily);
                    ctx.fillStyle = '#4B5563';

                    chart.chart.data.datasets[0].data.forEach(function(dataset: number, i: number) {
                        const meta = chart.chart.controller.getDatasetMeta(i);
                        meta.data.forEach(function(bar: any, index: number) {
                            const label = `$${chartValues[index]}`;
                            const xOffset = bar._model.x - (label.length * 10)/2;
                            const yOffset = 450;
                            ctx.fillText(label, xOffset, yOffset);
                        });
                    });
                },
            },
			legend: {
				display: false,
			},
            maintainAspectRatio: false,
            responsive: true,
            scales: {
				xAxes: [
					{
						gridLines: {
							display: false,
						},
                        position: 'chartArea',
						ticks: {
							fontSize: 14,
							// fontStyle: 'bold',
						},
					},
				],
				yAxes: [
					{
						gridLines: {
							display: false,
						},
						ticks: {
							beginAtZero: true,
							display: false,
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

	return (
	    <div style={{ height: '500px' }}>
            <canvas ref={myChart} />
        </div>
    );
};

export default BarChart;
