'use static';

import React from 'react'
import { connect }  from 'react-redux';
import Button from '../../components/Button/Button';
import AccountDisplay from '../../components/AccountDisplay/AccountDisplay';
import TotalProducts from '../TotalProducts/TotalProducts';
import { initPageContent, initSdk, initWXConfig} from '../../actions/index'
import wx from 'weixin-js-sdk';
require('./index.css');

class ConfirmOrder extends React.Component {
	constructor(props){
		super(props);
	}

    componentWillMount() {
        //init page content
        const { dispatch } = this.props;
        dispatch(initWXConfig());
        // dispatch(initPageContent());
	}

    componentDidUpdate() {
        const { dispatch } = this.props;
        let props = this.props.state;
        let config = props.authConfig;
        if(config.sign && !props.sdkInited) {
            if(this.initWx(config)) {
                dispatch(initSdk());
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
                jsApiList: ["chooseWXPay"]
            });
            return true;
        } catch (e) {
            return false
        }

    }

    payOrder() {
        let config = this.props.state.wxConfig;
        console.log("order paying");
        console.log(config)
        wx.ready(function(){
            wx.chooseWXPay({
                timestamp: config.timeStamp,
                nonceStr: config.nonceStr,
                package: config.packageProperty,
                signType: "MD5",
                paySign: config.paySign,
                success: function(r){
                    console.log(r)
                    //todo redirect to
                },
                fail: function(r){
                    //todo
                    console.log(r);
                    console.log('fail')
                },
                cancel: function(r){
                    //todo
                    console.log(r);
                    console.log('cancel')
                }
            });
        });
    }

	render(){
        let props = this.props.state.orderInfo;

        let productItems = props.childOrders.map(
            (productItem, index) =>
                <TotalProducts key={index} productItem={productItem}/>
        );
        return(
            <div className='orderDetailContainer'>
                <div className="buttonArea clearfix">
                    <span className='font14'>剩余支付时间： {props.remainTime}</span>
                </div>
                {productItems}
                {/*<div className="totalArea">*/}
                    {/*<AccountDisplay name='商品总金额' money={props.actualMoney}/>*/}
                    {/*<AccountDisplay name='商品优惠总计' money={props.productDiscount}/>*/}
                    {/*<AccountDisplay name='总金额优惠总计' money={props.limitDiscount}/>*/}
                {/*</div>*/}
                <div className='font14 totalMoney'>
                    <AccountDisplay name='应付金额' money={props.totalPrice/100 || 0}/>
                </div>
                <Button buttonClassName={'weiXinPay'}
                        buttonText={'微信支付'+ (props.totalPrice/100 || 0)+'元'}
                        buttonClick={this.payOrder.bind(this)}
                        disabled={!this.props.state.sdkInited}
                />
            </div>
        );
    }
}

function select(store) {
	console.log('dispatched')
	return Object.assign({}, {state: store})
}

export default connect(select)(ConfirmOrder)