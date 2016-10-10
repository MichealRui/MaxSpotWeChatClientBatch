'use strict';
import React, { Component } from 'react';
require ('./index.css');

export default class HomeMade extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let props = this.props;
        return (
            <div className="homeMade">
                <img src={props.homeMadeImg} className="homeMadeImg"/> 
                <div className='content'>
                    <h1 className='font16'>在家也能开冰店</h1>
                    <p className='font14'>Home Made 制冰模具 / 刨冰机</p>
                </div>
            </div>
        );
    }
}