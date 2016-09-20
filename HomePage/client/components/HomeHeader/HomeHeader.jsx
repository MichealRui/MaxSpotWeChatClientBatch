'use strict';
import React, { Component } from 'react';
require ('./index.css');

export default class HomeHeader extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let props = this.props;
        return (
            <div className="homeHeader">
                <img src={props.logo} alt="maxSpot" className="logo"/> 
                <span className='button login fa fa-user font18'></span>
                <span className='button search fa fa-search font18'></span>
            </div>
        );
    }
}