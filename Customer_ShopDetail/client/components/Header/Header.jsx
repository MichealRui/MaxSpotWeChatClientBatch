'use strict';

import React from 'react';
import shopImage from './images/shop.jpg';
require ('./index.css');

export default class Header extends React.Component{

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="header">
                <img className="shopImg" src={shopImage} />
                <div className="shopName">光华路SOHO3Q</div>
                <span className="fa fa-heart-o fa-1 favourite" aria-hidden="true"></span>
            </div>
        )
    }

}