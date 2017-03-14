'use strict';
import React from 'react';
require('./index.css');

export default class ShopDetailGallery extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let props = this.props;
        let img_list = props.storeInfo.images.map(
            (img,index) => {
                return (
                    <li className="shopImg" key={index}>
                        <img src={ENV.domain + img} alt="店铺实拍"/>
                    </li>
                )
            }
        )
        return (
            <div className="ShopDetailGallery">
                <div className="shop_text font16">位置图片</div>
                <ul className="imageContainer">
                    {img_list}
                </ul>
            </div>
        )
    }
}

ShopDetailGallery.PropTypes = {
    storeInfo : React.PropTypes.object
};
ShopDetailGallery.defaultProps = {
    storeInfo : {
        images : []
    }
}