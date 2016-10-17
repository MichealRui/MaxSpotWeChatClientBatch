'use strict';

import React from 'react';
import shopImage from './images/shop.jpg';
require ('./index.css');

export default class Header extends React.Component{
    constructor(props) {
        super(props)

    }
    render() {
        const itemInfo = this.props.itemInfo
        console.log(itemInfo);
        const heartClass = itemInfo.like ? 'fa fa-heart active fa-1 favourite' : 'fa fa-heart-o fa-1 favourite';
        const itemMethod = this.props.itemMethod;
        return (
            <div className="header">
                <img className="shopImg" src={itemInfo.shopImg} />
                <div className="shopName">{itemInfo.shopName}</div>
                <span className={heartClass} aria-hidden="true" onClick={(itemInfo)=>itemMethod.changelike(itemInfo)}></span>
            </div>
        )
    }

}