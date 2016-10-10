'use strict';
import React from 'react';
require('./index.css');


export default class Info extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ul className="infoContainer">
                <li>
                    <span className="fa fa-map-marker icon" aria-hidden="true"></span>
                    <p className="content">北京市朝阳区建国门</p>
                    <span className="fa fa-angle-right rightArrow"></span>
                </li>
                <li>
                    <span className="fa fa-clock-o icon"></span>
                    <p className="content">8:00 - 23:00</p>
                    <span className="fa fa-angle-right rightArrow"></span>
                </li>
                <li>
                    <span className="fa fa-phone icon"></span>
                    <p className="content">6726480348</p>
                    <span className="fa fa-angle-right rightArrow"></span>
                </li>
            </ul>
        )
    }
}