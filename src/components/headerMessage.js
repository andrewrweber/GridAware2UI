import React, { Component } from 'react';
import Config from '../config.json';

class HeaderMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }
  componentWillReceiveProps(props){
    let normalizedBulbVal = props.normalizedBulbVal;

		if(normalizedBulbVal > 0 && normalizedBulbVal <= 0.20) {
			this.setState({ message: Config.messages['green']});
		}
		else if(normalizedBulbVal > 0.20 && normalizedBulbVal <= 0.40) {
			this.setState({ message: Config.messages['lightgreen']});
		}
		else if(normalizedBulbVal > 0.40 && normalizedBulbVal <= 0.60) {
			this.setState({ message: Config.messages['yellow']});
		}
		else if(normalizedBulbVal > 0.60 && normalizedBulbVal <= 0.80) {
			this.setState({ message: Config.messages['orange']});
		}
		else {
			this.setState({ message: Config.messages['red']});
		}
  console.log(Config.messages['red']);
  }
  
  render() {
    return (
      <div className="header-message">The CA Electric Grid is <span>{this.state.message}</span></div>
    );
  }
}

export default HeaderMessage;
