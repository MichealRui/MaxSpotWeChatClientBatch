'use strict';
import React from 'react';
require('./index.css');


export default class Info extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const itemInfo = this.props.itemInfo;
        return (
            <ul className="infoContainer">
                <li>
                    <span className="fa fa-map-marker icon" aria-hidden="true"></span>
                    <p className="content font14">{itemInfo.shopAddress}</p>
                    <span className="fa fa-angle-right rightArrow"></span>
                </li>
                <li>
                    <span className="fa fa-clock-o icon"></span>
                    <p className="content">{itemInfo.shopTime}</p>
                    <span className="fa fa-angle-right rightArrow"></span>
                </li>
                <li>
                    <span className="fa fa-phone icon"></span>
                    <p className="content">{itemInfo.telephone}</p>
                    <span className="fa fa-angle-right rightArrow"></span>
                </li>
            </ul>
        )
    }
}