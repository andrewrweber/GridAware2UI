import React, { Component } from 'react';

class ChartControls extends Component {
    constructor(props) {
        super(props);
        
        this.selected = "Day";
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        if(this.selected !== e.target.id) {
            this.selected = e.target.id;
            this.props.changeDataRange(this.selected);
        }
    }
    render() {
        return (
            <fieldset>
            <legend>View Past:</legend>
            <div className="switch-toggle switch-candy">
                <input id="Day" name="view" type="radio" onClick={ this.handleClick.bind(this) }/>
                <label htmlFor="Day" onClick="">Day</label>

                <input id="Week" name="view" type="radio" onClick={ this.handleClick.bind(this) }/>
                <label htmlFor="Week" onClick="">Week</label>
                <a></a>
            </div>
            </fieldset>
        );
    }

}

export default ChartControls;