import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} = require('recharts');

import CombinedLineChart from './combinedLineChart';
import ChartControls from './chartControls';

import Config from '../config.json';

class GraphContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: null
        };

        this.changeDataRange = this.changeDataRange.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }
    
    changeDataRange(range) {
        const endTime = moment().unix();
        if(range === "Day") {
            const startTime = endTime - (60 * 60 * 24 * 1);
            this.fetchData(startTime, endTime);
        }
        else if(range === "Week") {
            const startTime = endTime - (60 * 60 * 24 * 7);
            this.fetchData(startTime, endTime);       
        }
    }

    createChartPoint(element) {
        return {
            timestamp: moment(element.timestamp).format('ddd h:mma'),
            carbon: Math.round(element.carbon),
            wind: _.get(element, ['genmix',1, 'gen_MW'], 0),
            solar: _.get(element, ['genmix',2, 'gen_MW'], 0),
            renewables: _.get(element, ['genmix',3, 'gen_MW'], 0),
            other: _.get(element, ['genmix',0 , 'gen_MW'], 0)
        };
    }

    transforDataForCharts(carbonData) {
        const numPoints = Config.numGraphPoints;
        const interval = Math.floor(carbonData.length / numPoints);
        let chartData=[];

        for(let i = 0; i < carbonData.length; i+=interval) {
            chartData.push(this.createChartPoint(carbonData[i]));
        }
        // Push in the last point
        let lastPoint = carbonData[carbonData.length-1];

        chartData.push(this.createChartPoint(lastPoint));

        return { chartData };
    }

    componentWillMount() {
        const endTime = moment().unix();
        const startTime = endTime - (60 * 60 * 24 * 1);
        this.fetchData(startTime, endTime);
    }

    fetchData(startTime, endTime) {
        axios({
            url: `${Config.apiRoot}/${Config.getGenmixByTimestampEndpoint}`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "min": startTime,
                "max": endTime
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
                        <div className="three columns">
                            <ChartControls changeDataRange={this.changeDataRange} />
                        </div>
                    </div>
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