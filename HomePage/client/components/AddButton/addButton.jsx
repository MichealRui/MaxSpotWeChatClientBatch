'use strict';
import React from 'react'
require('./index.css');

export default class AddButton extends React.Component {
    constructor(props) {
        super(props)
    }
    
    addClick() {
        // todo update cart
        console.log("add")
    }
    
    render() {
        let props = this.props;
        console.log("button")
        return (
            <span className="add" item={props.item} onClick={this.addClick.bind(this)}>+++</span>
        )
    }
}