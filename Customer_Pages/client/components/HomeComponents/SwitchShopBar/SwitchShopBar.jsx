'use strict';
import React, { Component } from 'react';
require ('./index.css');

export default class SwitchShopBar extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let props = this.props;
        return (
            <div className="headerButton">
                <p className='address font12'>{props.address}</p>
                <span className='button switchButton font12'>切换机器</span>
            </div>
        );
    }
}