'use strict';

import React from 'react';
require ('./index.css');

export default class Header extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        const store = this.props.store;
        // const heartClass = itemInfo.like ? 'fa fa-heart active fa-1 favourite' : 'fa fa-heart-o fa-1 favourite';
        // const itemMethod = this.props.itemMethod;
        console.log(ENV.domain)
        return (
            <div className="header">
                <img className="shopImg" src={ENV.domain + store.imagePath} />
                <div className="shopName">{store.name}</div>
                <span className={'fa fa-heart active fa-1 favourite'} aria-hidden="true"></span>
            </div>
        )
    }

}