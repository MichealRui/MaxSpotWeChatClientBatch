'use strict';

import React from 'react';
import util from '../../../util/WeChatUtil'
require ('./index.css');

export default class ShopDetailHeader extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        const props = this.props;
        let domain = ENV.domain;
        domain = 'http://114.215.143.97';
        let defaultImg = DEFALUT_INFO.defaultImg;
        return (
            <div className="ShopDetailHeader">
                {
                    props.storeInfo.imagePath ? <img className="shopImg" src={domain + '/'+ util.getMiddlePic(props.storeInfo.imagePath)} />
                        : <img className="shopImg" src={defaultImg} />
                }

                <div className="shopName font14">{props.storeInfo.name}</div>
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