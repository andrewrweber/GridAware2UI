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
            let wind = _.get(dataPoint, ['genmix',1, 'gen_MW'], 0);
            let solar = _.get(dataPoint, ['genmix',2, 'gen_MW'], 0);
            let renewables = _.get(dataPoint, ['genmix',3, 'gen_MW'], 0);
            let other = _.get(dataPoint, ['genmix',0 , 'gen_MW'], 0);

            chartData.push({ timestamp, carbon, wind, solar, other, renewables })
        }
        // Push in the last point
        let dataPoint = carbonData[carbonData.length-1];
        let timestamp = moment(dataPoint.timestamp).format('h:mma');
        let carbon = dataPoint.carbon;
        let wind = _.get(dataPoint, ['genmix',1, 'gen_MW'], 0);
        let solar = _.get(dataPoint, ['genmix',2, 'gen_MW'], 0);
        let renewables = _.get(dataPoint, ['genmix',3, 'gen_MW'], 0);
        let other = _.get(dataPoint, ['genmix',0 , 'gen_MW'], 0);
        
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
                <div className="row">
                    <div className="twelve columns">
                        <h3>Past 24 Hours</h3>
                    </div>
                </div> 
                <div className="row">
                <div className="twelve columns">
                    <ResponsiveContainer width='100%' aspect={9.0/3.5}>
                        <LineChart data={data}
                                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="timestamp"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Line type="monotone" dataKey="renewables" stroke="#26A65B" activeDot={{r: 6}}/>
                        <Line type="monotone" dataKey="wind" stroke="#4B77BE" activeDot={{r: 6}}/>
                        <Line type="monotone" dataKey="solar" stroke="#F9BF3B" activeDot={{r: 6}}/>
                        <Line type="monotone" dataKey="other" stroke="#EC644B" activeDot={{r: 6}}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                </div>
                </div>
             : null }
            </div>
        );
    }
}

export default CarbonGraph;