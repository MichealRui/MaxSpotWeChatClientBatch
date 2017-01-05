'use strict';
import React from 'react';
require('./index.css');


export default class Info extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const store = this.props.store;
        return (
            <ul className="infoContainer">
                <li>
                    <span className="fa fa-map-marker icon" aria-hidden="true"></span>
                    <p className="content font14">{store.address}</p>
                    <span className="fa fa-angle-right rightArrow"></span>
                </li>
                <li>
                    <span className="fa fa-clock-o icon"></span>
                    <p className="content">{store.openingTime}</p>
                    <span className="fa fa-angle-right rightArrow"></span>
                </li>
                <li>
                    <span className="fa fa-phone icon"></span>
                    <p className="content">{store.phone}</p>
                    <span className="fa fa-angle-right rightArrow"></span>
                </li>
            </ul>
        )
    }
}