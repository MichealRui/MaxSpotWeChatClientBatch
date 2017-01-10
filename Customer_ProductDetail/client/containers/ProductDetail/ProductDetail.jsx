'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/index';
import wx from 'weixin-js-sdk';
import ProductDetailTitle from '../../components/ProductDetailTitle/ProductDetailTitle';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import AddIntoCart from '../../components/AddIntoCart/AddIntoCart';
import StoreIntro from '../../components/StoreIntro/StoreIntro';
import ButtonBottom from '../../components/BottomButton/BottomButton'
import Util from '../../util/WeChatUtil'
require('./index.css');

class ProductDetail extends React.Component {
	constructor(props){
		super(props);
	}

	componentWillMount(){
	    const {actions} = this.props;
        let param = Util.getUrlParam();
        let storeId = param.storeid;
        let skuNumber = param.skunumber;
        if(!storeId){
            actions.initWx(window.location.href)
        } else {
            actions.initProductDetail(skuNumber, storeId);
            actions.initCart();
        }
    }

    componentDidUpdate() {
        const { actions } = this.props;
        let param = Util.getUrlParam();
        let skuNumber = param.skunumber;
        let props = this.props.detail;
        let config = props.wxConfig;
        if(config.sign && !props.sdkInited) {
            if(this.initWx(config)) {
                actions.initSdk();
                this.getGeoProduct(skuNumber).bind(this);
            }
        }
    }

    initWx(config) {
        let appId = 'wx4da5ecd6305e620a';
        try {
            wx.config({
                debug: false,
                appId: appId,
                timestamp: config.timestamp,
                nonceStr: config.noncestr,
                signature: config.sign,
                jsApiList: ["getLocation"]
            });
            return true;
        } catch (e) {
            return false
        }

    }

    getGeoProduct(skuNumber) {
        var geo;
        const { actions } = this.props;
        wx.ready(function(){
            wx.getLocation({  // wx api
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    let speed = res.speed; // 速度，以米/每秒计
                    let accuracy = res.accuracy; // 位置精度
                    geo = {
                        latitude,
                        longitude,
                        speed,
                        accuracy
                    };
                    actions.initProductDetailByGeo(skuNumber, geo);
                    actions.initCart();
                    return true
                },
                fail: function (res) {
                    actions.initFail();
                    return false
                },
                cancel: function (res) {
                    actions.initFail();
                    return false
                }
            });
        });
    }

	render(){
		let {detail, actions} = this.props;
		let {productDetail, brand,total} = detail;
        let param = Util.getUrlParam();
        let storeId = param.storeid;
		return(
			<div className='productDetailContainer'>
				<div className='area'></div>
				<ProductDetailTitle
                    productStore={productDetail.brandName}
                    productName={productDetail.name}
                    productInfo={productDetail.productInfo}
                />
				<ProductSlider productImgs={productDetail.images}/>
				<AddIntoCart
                    productCost={productDetail.sellprice / 100}
                    productCount={productDetail.quantity}
                    addIntoCartClick={
                        ()=>{actions.addIntoCart(
                            {
                                skuId: productDetail.id + '',
                                storeId: storeId + '',
                                count: '1'
                            }
                        )}}
                />
				<p className='storeInfo font12'>{productDetail.description}</p>
				<div className='storeIntroWrap'>
					<StoreIntro brand = {brand}
                                storeId = {storeId}
                    />
				</div>
				{/*<ProductComment productComment={productDetail.productComment}/>*/}
                <ButtonBottom className="buttonBottom" total={total}/>
			</div>
		);
	}
}

function mapStateToProps(state){
    return {
        detail:state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(Actions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);