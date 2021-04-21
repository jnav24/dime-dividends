import React from 'react';

import Auth from './layouts/Auth';
import AuthContent from './layouts/AuthContent';
import BarChart from '../components/charts/BarChart';
import {Chart} from 'chart.js';

const Income = () => {
	return (
		<Auth>
			<div className="bg-white">
				<AuthContent>
					<BarChart
						labels={[
							['January'],
							['February'],
							['March'],
							['April'],
							['May'],
							['June'],
							['July'],
							['August'],
							['September'],
							['October'],
							['November'],
							['December'],
						]}
						data={[
							{
								label: 'Earned',
								backgroundColor: 'rgba(69,173,168,0.2)',
								borderColor: 'rgba(69,173,168,1)',
								borderWidth: 1,
								data: [49, 38, 24, 16, 88, 36, 24, 13, 8, 10, 63, 72],
							},
						]}
                        options={{
                            animation: {
                                duration: 1000,
                                onComplete(chart: any) {
                                    const { ctx, data: { datasets } } = chart.chart;
                                    const { data } = datasets[0];
                                    ctx.font = Chart.helpers.fontString(18, 'bold', Chart.defaults.global.defaultFontFamily);
                                    ctx.fillStyle = '#4B5563';

                                    data.forEach(function(dataset: number, i: number) {
                                        const meta = chart.chart.controller.getDatasetMeta(i);
                                        meta.data.forEach(function(bar: any, index: number) {
                                            const label = `$${data[index]}`;
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
                        }}
                        wrapperStyles={{ height: '500px' }}
					/>
				</AuthContent>
			</div>
		</Auth>
	);
};

export default Income;
