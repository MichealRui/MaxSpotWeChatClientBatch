'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class skuHeader extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        let sub_title = (
            <div className="sub_title">
                <p className="font26">Lipo</p>
                <p className="font32">蛋奶酥脆面包干</p>
                <p className="font26">500g 8枚入</p>
            </div>
        )
        let sub_price = (
            <div className="sub_price">
                <p className="font48"><span className="font20">￥</span>36</p>
                <p className="font24">市场价 126元</p>
            </div>
        )

        return (
            <div className="skuHeader clearfix">
                {sub_title}
                <div className="sub_info">
                    {sub_price}
                    <button className="button font32"><span>加入购物袋</span></button>
                </div>

            </div>

        )
    }
}


