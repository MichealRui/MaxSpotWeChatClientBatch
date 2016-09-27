'use strict';
import React, { Component } from 'react';
require ('./index.css');

export default class BottomButton extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        
    }
    
    render() {
        let props = this.props.cart;
        return (
            <div className={props.remainTime?"bottomButton":"bottomButton empty"}>
                <div className='cartIcon'>
                    <span className='fa fa-shopping-cart font30'>
                        {props.count>=0?(<span className='count font10'>{props.count}</span>):''}
                    </span>
                </div>

                    {props.remainTime?
                        (
                            <div className='lastTime'>
                                <div>
                                    <p className='font7'>剩余时间</p>
                                    <p>{props.remainTime}</p>
                                </div>
                            </div>
                        ):''}
            </div>
        );
    }
}