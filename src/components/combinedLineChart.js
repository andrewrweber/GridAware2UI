import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const CombinedLineChart = ({data}) => {
    return (
        <div className="combined-line-chart-wrapper">
            <div className="row">
                <div className="twelve columns line-chart-title">
                    Past 24 Hours Electric Generation Mix
                </div>
            </div>
            <div className="row">
                <div className="twelve columns">
                    <ResponsiveContainer width='100%' aspect={9.0/4}>
                        <LineChart data={data}
                                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis tick={{ transform: 'translate(0, +4)' }} dataKey="timestamp"/>
                        <YAxis yAxisId="left" orientation="left"
                            tick={{ transform: 'translate(-1, 0)' }}/>
                        <YAxis yAxisId="right" orientation="right"
                            tick={{ transform: 'translate(-1, 0)' }} domain={['dataMin - 100', 'dataMax + 100']} />
                        <Tooltip/>
                        <Legend />
                        <Line yAxisId="left" type="monotone" unit=" MW" dataKey="wind" stroke="#4B77BE" activeDot={{r: 6}}/>
                        <Line yAxisId="left" type="monotone" unit=" MW" dataKey="solar" stroke="#F9BF3B" activeDot={{r: 6}}/>
                        <Line yAxisId="left" type="monotone" unit=" MW" dataKey="renewables" name="other renewables" stroke="#26A65B" activeDot={{r: 6}}/>
                        <Line yAxisId="left" type="monotone" unit=" MW" dataKey="other" name="other generation" stroke="#EC644B" activeDot={{r: 6}}/>
                        <Line yAxisId="right" strokeDasharray="5 5" dot={false}
                            type="monotone" unit=" tons C02" dataKey="carbon" name="total carbon" stroke="#22313F" activeDot={{r: 6}}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default CombinedLineChart;