import React, { Component } from 'react';

class Bulb extends Component {
	constructor(props) {
		super(props);
		this.state = { bulbColor: 'null', glowSize: 'small', shadow: null }
	}
	componentWillReceiveProps(props) {
		let normalizedBulbVal = props.normalizedBulbVal;

		if(normalizedBulbVal > 0 && normalizedBulbVal <= 0.20) {
			this.setState({ bulbColor: 'green', glowSize: 'small' });
		}
		else if(normalizedBulbVal > 0.20 && normalizedBulbVal <= 0.40) {
			this.setState({ bulbColor: 'lightgreen', glowSize: 'small' });
		}
		else if(normalizedBulbVal > 0.40 && normalizedBulbVal <= 0.60) {
			this.setState({ bulbColor: 'yellow', glowSize: 'small' });
		}
		else if(normalizedBulbVal > 0.60 && normalizedBulbVal <= 0.80) {
			this.setState({ bulbColor: 'orange', glowSize: 'small' });
		}
		else {
			this.setState({ bulbColor: 'red', glowSize: 'small' });
		}

		setTimeout(()=> {this.setState({glowSize: 'large'})}, 75);
		setTimeout(()=> {this.setState({shadow: 'shadow'})}, 125);
	}

  render() {
    return (
        <div className="header-bulb-container">
            <div className={`bulb-glow ${this.state.bulbColor} ${this.state.glowSize} ${this.state.shadow}`}></div>
            <img src="../assets/images/bulb.svg" />
        </div>
    )
  }
}

export default Bulb;