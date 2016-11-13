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
            <li className={ "selector"+ " J_" + props.key }>
                <div className={"itemIcon font34 fa " +props.faIcon}
                     data-key={props.key}
                ></div>
                <div className='itemName font14'>{props.content}</div>
                <span className={'triangle ' + (this.props.isActivated ? 'activated': '')}></span>
            </li>
        )
    }
}