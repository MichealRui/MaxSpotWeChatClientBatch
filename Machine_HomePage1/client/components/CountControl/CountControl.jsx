"use strict";

import React from 'react';
require('./index.css');

export default class CountControl extends React.Component{
    constructor(props){
        super(props);
    }

    dec() {
        this.props.decrease(
            this.props.item
        )
    }

    add() {
        this.props.addItem(
            this.props.item
        )
    }

    render(){
        let props = this.props.item;
        return (
            <div className="countControl">
                <a className={"simble fa font12 fa-minus " + (props.count <= 1 ? 'color999 ' : 'color333 ') + (this.props.fontClass)} disabled={ props.count == 1} onClick={()=>this.dec.bind(this)()} ></a>
                <span className={"count font14 " + this.props.countFontSize}>{props.count}</span>
                <a className={"simble fa font12 fa-plus " + (props.quantity <= props.count ? 'color999 ' : 'color333 ') + (this.props.fontClass)} disabled={ props.quantity <= props.count} onClick={()=>this.add.bind(this)()} ></a>
            </div>
        )
    }
}