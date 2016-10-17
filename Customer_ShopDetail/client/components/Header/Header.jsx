'use strict';

import React from 'react';
import shopImage from './images/shop.jpg';
require ('./index.css');

export default class Header extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            checked:true,
            edit:false
        }
    }
    render() {
        const itemInfo = this.props.itemInfo
        console.log(itemInfo);
        return (
            <div className="header">
                <img className="shopImg" src={itemInfo.shopImg} />
                <div className="shopName">光华路SOHO3Q</div>
                <span className="fa fa-heart-o fa-1 favourite" aria-hidden="true"></span>
            </div>
        )
    }

}