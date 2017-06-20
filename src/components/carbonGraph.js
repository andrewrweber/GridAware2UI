import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import Config from '../config.json';

class CarbonGraph extends Component {
    componentWillMount() {
        const timeNow = moment().unix();
        const weekAgo = timeNow - (60 * 60 * 24 * 7);

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
        });
    }

    render() {
        return (
            <div>Graph</div>
        );
    }
}

export default CarbonGraph;