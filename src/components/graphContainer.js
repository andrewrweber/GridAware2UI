import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} = require('recharts');

import GenmixLineChart from './genmixLineChart';
import TotalCarbonLineChart from './totalCarbonLineChart';
import CombinedLineChart from './combinedLineChart';

import Config from '../config.json';

class GraphContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: null,
        };
    }

    transforDataForCharts(carbonData) {
        const numPoints = Config.numGraphPoints;
        const interval = Math.floor(carbonData.length / numPoints);
        let chartData=[];

        for(let i = 0; i < carbonData.length; i+=interval) {
            let dataPoint = carbonData[i];
            let timestamp = moment(dataPoint.timestamp).format('h:mma');
            let carbon = Math.round(dataPoint.carbon);
            let wind = _.get(dataPoint, ['genmix',1, 'gen_MW'], 0);
            let solar = _.get(dataPoint, ['genmix',2, 'gen_MW'], 0);
            let renewables = _.get(dataPoint, ['genmix',3, 'gen_MW'], 0);
            let other = _.get(dataPoint, ['genmix',0 , 'gen_MW'], 0);

            chartData.push({ timestamp, carbon, wind, solar, other, renewables });
        }
        // Push in the last point
        let dataPoint = carbonData[carbonData.length-1];
        let timestamp = moment(dataPoint.timestamp).format('h:mma');
        let carbon = Math.round(dataPoint.carbon);
        let wind = _.get(dataPoint, ['genmix',1, 'gen_MW'], 0);
        let solar = _.get(dataPoint, ['genmix',2, 'gen_MW'], 0);
        let renewables = _.get(dataPoint, ['genmix',3, 'gen_MW'], 0);
        let other = _.get(dataPoint, ['genmix',0 , 'gen_MW'], 0);

        chartData.push({ timestamp, carbon, wind, solar, other, renewables })

        return { chartData };
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
            const data = this.transforDataForCharts(result.data);
            let { chartData } = data;
            this.setState({ chartData });
        });
    }

    render() {
        const data = this.state.chartData;
        return (
            <div className="graph-container">
                {this.state.chartData ?
                <div className="container">
                    <div className="row">
                        <div className="twelve columns">
                            <CombinedLineChart data={this.state.chartData}  />
                        </div>
                    </div>
                </div>
                : null }
            </div>
        );
    }
}

export default GraphContainer;

                    // <div className="row">
                    //     <div className="twelve columns ">
                    //         <GenmixLineChart data={this.state.chartData} />
                    //     </div>
                    // </div>
                    // <div className="row">
                    //     <div className="twelve columns">
                    //         <TotalCarbonLineChart data={this.state.chartData}  />
                    //     </div>
                    // </div>