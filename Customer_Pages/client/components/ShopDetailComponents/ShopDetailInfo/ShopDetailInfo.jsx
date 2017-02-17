'use strict';
import React from 'react';
require('./index.css');


export default class ShopDetailInfo extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const props = this.props;
        return (
            <ul className="ShopDetailInfo">
                <li>
                    <span className="fa fa-map-marker icon" aria-hidden="true"></span>
                    <p className="content font14">{props.storeInfo.address}</p>
                    <span className="fa fa-angle-right rightArrow"></span>
                </li>
                <li>
                    <span className="fa fa-clock-o icon"></span>
                    <p className="content">{props.storeInfo.openingTime}</p>
                    <span className="fa fa-angle-right rightArrow"></span>
                </li>
                <li>
                    <span className="fa fa-phone icon"></span>
                    <p className="content">{props.storeInfo.phone}</p>
                    <span className="fa fa-angle-right rightArrow"></span>
                </li>
            </ul>
        )
    }
}

ShopDetailInfo.PropTypes = {
    storeInfo : React.PropTypes.object
};
ShopDetailInfo.defaultProps = {
    storeInfo:{
        address:'',
        openingTime:'',
        phone:''
    }
}