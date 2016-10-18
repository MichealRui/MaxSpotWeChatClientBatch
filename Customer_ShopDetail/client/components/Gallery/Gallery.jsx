'use strict';
import React from 'react';
require('./index.css');

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const galleryInfo = this.props.itemInfo;
        return (
            <li className="shopImg">
                <img className="fl" src={galleryInfo.imagepath1} alt=""/>
                <img className="fr" src={galleryInfo.imagepath2} alt=""/>
            </li>
        )
    }
}