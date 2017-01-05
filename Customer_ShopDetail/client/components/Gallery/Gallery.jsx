'use strict';
import React from 'react';
require('./index.css');

export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const gallerySrc = this.props.address;
        return (
            <li className="shopImg">
                {
                    gallerySrc ? <img src={gallerySrc} alt="店铺实拍"/> : ''
                }
            </li>
        )
    }
}