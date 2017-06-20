import React, { Component } from 'react';

class Bulb extends Component {
  render() {
    return (
        <div className="header-bulb-container">
            <div className="bulb-glow green"></div>
            <img src="../assets/images/bulb.svg" />
        </div>
    )
  }
}

export default Bulb;