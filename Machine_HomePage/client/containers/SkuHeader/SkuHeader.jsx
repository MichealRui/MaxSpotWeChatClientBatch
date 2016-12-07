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
                <p class="font18">Lipo</p>
                <p class="font20">蛋奶酥脆面包干</p>
                <p class="font14">500g 8枚入</p>
            </div>
        )
        let sub_price = (
            <div class="sub_price">
                <p class="font30"><span class="font20">￥</span>36</p>
                <p>市场价 126元</p>
            </div>
        )

        return (
            <div className="skuHeader clearfix">
                {sub_title}
                {sub_price}
                <button className="button font20"><span>加入购物袋</span></button>
            </div>

        )
    }
}


