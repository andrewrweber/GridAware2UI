import React, {Component} from 'react';
import '../scss/main.scss';
import axios from 'axios';
import _ from 'lodash';

import Config from '../config.json';
import Bulb from './bulb';
import HeaderMessage from './headerMessage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCarbon: null,
      weekAvgCarbon: null,
      weekMaxCarbon: null,
      weekMinCarbon: null,
      normalizedBulbVal: null
    }
  }
  componentWillMount() {
    const uri = `${Config.apiRoot}/${Config.carbonStatsEndpoint}`
    axios.get(uri)
      .then((result) => {
        let currentCarbon = _.get(result, ['data', 'currentCarbon'], null);
        let weekAvgCarbon = _.get(result, ['data', 'weekAvgCarbon'], null);
        let weekMaxCarbon = _.get(result, ['data', 'weekMaxCarbon'], null);
        let weekMinCarbon = _.get(result, ['data', 'weekMinCarbon'], null);
        let normalizedBulbVal = (currentCarbon - weekMinCarbon) / (weekMaxCarbon - weekMinCarbon);
        this.setState({ currentCarbon, weekAvgCarbon, weekMaxCarbon, weekMinCarbon, normalizedBulbVal });
      });
  }

  render() {
    return (
      <div className="row">
        <header className="header twelve columns">
          <div className="header-hero-section twelve columns">
            <h1 className="header-title">Grid Aware California</h1>
            <Bulb normalizedBulbVal={this.state.normalizedBulbVal}/>
            <HeaderMessage normalizedBulbVal={this.state.normalizedBulbVal} />
          </div>
        </header>
        <section className="row">
          <div className="twelve columns">
            
          </div>
        </section>
      </div>
    )
  }
}

export default App;