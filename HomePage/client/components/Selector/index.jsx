'use strict';
import React from 'react'

export default class Selector extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        let props = this.props.data;
        return (
            <li className={ "selector" + " J_" + props.key } onClick={() => this.props.onclick(props.key)}>
                <span>
                    {props.content}
                </span>
            </li>
        )
    }
}