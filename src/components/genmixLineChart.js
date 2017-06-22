import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const GenmixLineChart = ({data}) => {
    return (
        <div>
            <div className="row">
                <div className="twelve columns line-chart-title">
                    Past 24 Hours Electric Generation Mix
                </div>
            </div>
            <div className="row">
                <div className="twelve columns">
                    <ResponsiveContainer width='100%' aspect={9.0/3.5}>
                        <LineChart data={data}
                                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis tick={{ transform: 'translate(0, +4)' }} dataKey="timestamp"/>
                        <YAxis tick={{ transform: 'translate(-1, 0)' }}/>
                        <Tooltip/>
                        <Legend />
                        <Line type="monotone" unit=" MW" dataKey="renewables" stroke="#26A65B" activeDot={{r: 6}}/>
                        <Line type="monotone" unit=" MW" dataKey="wind" stroke="#4B77BE" activeDot={{r: 6}}/>
                        <Line type="monotone" unit=" MW" dataKey="solar" stroke="#F9BF3B" activeDot={{r: 6}}/>
                        <Line type="monotone" unit=" MW" dataKey="other" stroke="#EC644B" activeDot={{r: 6}}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default GenmixLineChart;