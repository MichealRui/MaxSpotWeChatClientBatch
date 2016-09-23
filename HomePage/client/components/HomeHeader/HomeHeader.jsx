'use strict';
import React, { Component } from 'react';
require ('./index.css');

export default class HomeHeader extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="homeHeader">
                <img src={require('./images/logo.png')} alt="maxSpot" className="logo"/>
                <span className='button login fa fa-user font16'></span>
                <span className='button search fa fa-search font16'></span>
            </div>
        );
    }
}