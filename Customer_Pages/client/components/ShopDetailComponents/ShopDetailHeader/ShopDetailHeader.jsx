'use strict';

import React from 'react';
require ('./index.css');

export default class ShopDetailHeader extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        const props = this.props;
        return (
            <div className="ShopDetailHeader">
                <img className="shopImg" src={ENV.domain + props.storeInfo.imagePath} />
                <div className="shopName">{props.storeInfo.name}</div>
                <span className={'fa fa-heart active fa-1 favourite'} aria-hidden="true"></span>
            </div>
        )
    }

}

ShopDetailHeader.propTypes = {
    storeInfo : React.PropTypes.object
};

ShopDetailHeader.defaultProps = {
    storeInfo : {
        imagePath : '',
        name : '',
    }
}