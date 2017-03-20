'use strict';
import React from 'react';
import util from '../../../util/WeChatUtil'
require('./index.css');

export default class ShopDetailGallery extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let props = this.props;
        let domain = ENV.domain;
        domain = 'http://114.215.143.97';
        let defaultImg = DEFALUT_INFO.defaultImg;
        let img_list = props.storeInfo.images.map(
            (img,index) => {
                let img_html = img ? <img src={domain +'/' + util.getMiddlePic(img)} alt="店铺实拍"/> : <img src={defaultImg} alt="店铺实拍"/>
                return (
                    <li className="shopImg" key={index}>
                        {img_html}
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