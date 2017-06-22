import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const TotalCarbonLineChart = ({data}) => {
    return (
        <div>
            <div className="row">
                <div className="twelve columns line-chart-title">
                    Past 24 Hours Total Carbon
                </div>
            </div>
            <div className="row">
                <div className="twelve columns">
                    <ResponsiveContainer width='100%' aspect={9.0/3.5}>
                        <LineChart data={data} title="Total Carbon"
                                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis tick={{ transform: 'translate(0, +4)' }} dataKey="timestamp"/>
                        <YAxis tick={{ transform: 'translate(-1, 0)' }}/>
                        <Tooltip/>
                        <Legend />
                        <Line type="monotone" unit=" lbs C02" dataKey="carbon" stroke="#EC644B" activeDot={{r: 6}}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default TotalCarbonLineChart;