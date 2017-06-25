import React, { Component } from 'react';
import Config from '../config.json';

class HeaderMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { message: null };
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
  }
  
  render() {

    const valueClass = this.state.message ? "visible" : "invisible";
    
    return (
      <div className="header-message">
          <div className={`header-message-base ${valueClass}`}>The CA Electric Grid is</div>
          <div className={`header-message-value ${valueClass}`}>{this.state.message}</div>
      </div>
    );
  }
}

export default HeaderMessage;
