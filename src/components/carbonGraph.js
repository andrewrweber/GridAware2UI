import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} = require('recharts');

import Config from '../config.json';

class CarbonGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: null
        };
    }

    transformData(carbonData) {
        const numPoints = Config.numGraphPoints;
        const interval = Math.floor(carbonData.length / numPoints);
        let chartData=[];
        
        for(let i = 0; i < carbonData.length; i+=interval) {
            let dataPoint = carbonData[i];
            let timestamp = moment(dataPoint.timestamp).format('h:mma');
            let carbon = dataPoint.carbon;
            chartData.push({ timestamp, carbon })
        }
        // Push in the last point
        let dataPoint = carbonData[carbonData.length-1];
        console.log(dataPoint)
        let timestamp = moment(dataPoint.timestamp).format('h:mma');
        console.log(timestamp);
        let carbon = dataPoint.carbon;
        chartData.push({ timestamp, carbon })
        console.log(chartData);
        return chartData;
    }

    componentWillMount() {
        const timeNow = moment().unix();
        const weekAgo = timeNow - (60 * 60 * 24 * 1);

        axios({
            url: `${Config.apiRoot}/${Config.getGenmixByTimestampEndpoint}`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "min": weekAgo,
                "max": timeNow
            }
        })
        .then((result) => {
            console.log(result);
            const chartData = this.transformData(result.data);
            this.setState({chartData: chartData});
        });
    }

    render() {
        const data = this.state.chartData;
        return (
            <div className="container">
                {this.state.chartData ? 
                <div>
                <ResponsiveContainer width='100%' aspect={9.0/3.5}>
                    <LineChart data={data}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="timestamp"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Line type="monotone" dataKey="carbon" stroke="#8884d8" activeDot={{r: 8}}/>
                    </LineChart>
                </ResponsiveContainer>
                </div>
             : null }
            </div>
        );
    }
}

export default CarbonGraph;