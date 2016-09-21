'use strict';
import React, { Component } from 'react';
require ('./index.css');

export default class BottomButton extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let props = this.props;
        props={count:6, lastTime:'10:59'};
        return (
            <div className="bottomButton">
                <div className='cartIcon'>
                    <span className='fa fa-shopping-cart font30'>
                        {props.count>0?(<span className='count font10'>{props.count}</span>):''}
                    </span>
                </div>
                <div className='lastTime'>
                    <div>
                        <p className='font7'>剩余时间</p>
                        <p>{props.lastTime}</p>
                    </div>
                </div>
            </div>
        );
    }
}