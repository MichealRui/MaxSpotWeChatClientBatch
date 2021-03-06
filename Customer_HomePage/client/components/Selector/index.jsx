'use strict';
import React from 'react';
require ('./index.css');

export default class Selector extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let props = this.props.data;
        return (
            <li className={ "selector"+ " J_" + props.key }
                onClick={() => this.props.onclick(props.key)}>
                <div className={"itemIcon font34 fa " + (this.props.isActivated ? 'activated': '') }
                     data-key={props.key}
                >
                    <img src={props.icon} alt=""/>
                </div>
                <div className='itemName font14'>{props.content}</div>
                <span className={'triangle ' + (this.props.isActivated ? 'activated': '')}></span>
            </li>
        )
    }
}