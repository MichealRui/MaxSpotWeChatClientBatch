'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Item from '../../components/Item/index'
import SwiperComponent from '../../components/Swiper/index'
require('./index.css');

export default class CartBottom extends React.Component {
    constructor(props) {
        super(props)
    }

    onClickQr() {
        this.props.setCartLoading();
        this.props.submit()
    }

    render() {

        let swiperConfig = {
            // pagination: '.swiper2 .swiper-pagination',
            freeMode: true,
            slidesPerView: 3
        };

        let items = this.props.moreItems.map((item, index) => {
            return (
                <Item item={item} key={index}
                      isSliderItem={false}
                      click={this.props.itemClick}
                      store={this.props.store}
                />
            )
        });
        return (
            <div className="cart-other-content clearfix">
                <div className="cart-friends-choice clearfix">

                    <h1 className="cart-frd-title">其他小伙伴还购买了</h1>
                        {items}
                </div>

                <div className="cart-my-total">
                    <div className="my-total-box">
                        <div className="price-one-line clearfix">
                            <span className="price-name">商品总金额</span>
                            <span className="price-num">¥{this.props.totalPrice}</span>
                        </div>
                        <div className="price-one-line clearfix">
                            <span className="price-name">优惠总计</span>
                            <span className="price-num">¥0</span>
                        </div>
                        {/*<div className="price-one-line clearfix">*/}
                            {/*<span className="price-name">优惠总计</span>*/}
                            {/*<span className="price-num">¥-300</span>*/}
                        {/*</div>*/}
                        {/*<div className="price-one-line clearfix">*/}
                            {/*<span className="price-name">优惠总计</span>*/}
                            {/*<span className="price-num">¥-220</span>*/}
                        {/*</div>*/}
                        <div className="price-one-line should-pay clearfix">
                            <span className="price-name">应付金额</span>
                            <span className="price-num total-pay">¥{this.props.totalPrice}</span>
                        </div>
                        <div className="button font34" onClick={() => this.props.clearCart()}>清空购物袋</div>
                    </div>
                </div>

                <div className="cart-weixin-pay" onClick={() => this.onClickQr.bind(this)()}>
                    <img className="wx-pic" src={require("./images/weixinpay.png")} width="224" alt="微信支付" />
                    <div className="text font20">
                        <img src={require('./images/backborder.png')} alt=""/>
                        <span className="font20">部分商品缺货或已下架，请编辑购物袋</span>
                    </div>
                </div>
            </div>

            )
    }
}