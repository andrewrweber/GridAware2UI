import React, {Component} from 'react';
import '../scss/main.scss';

import Bulb from './bulb';

class App extends Component {
  render() {
    return (
      <div className="row">
        <header className="header twelve columns">
          <div className="header-hero-section twelve columns">
            <h1 className="header-title">Grid Aware California</h1>
            <Bulb />
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