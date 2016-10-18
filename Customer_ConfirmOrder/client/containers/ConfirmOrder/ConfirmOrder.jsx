'use static';

import React from 'react'
import { connect }  from 'react-redux';
import Button from '../../components/Button/Button';
import AccountDisplay from '../../components/AccountDisplay/AccountDisplay';
import TotalProducts from '../TotalProducts/TotalProducts';
import { initPageContent, initSdk} from '../../actions/index'
import wx from 'weixin-js-sdk';
require('./index.css');

class ConfirmOrder extends React.Component {
	constructor(props){
		super(props);
	}

    componentWillMount() {
        //init page content
        const { dispatch } = this.props;
        dispatch(initPageContent());
	}

    componentDidUpdate() {
        const { dispatch } = this.props;
        let props = this.props.state;
        let config = props.wxConfig;
        let appId = 'wx4da5ecd6305e620a';
        if(config.signature && !props.sdkInited) {
            wx.config({
                debug: false,
                appId: appId,
                timestamp: config.timeStamp,
                nonceStr: config.nonceStr,
                signature: config.signature,
                jsApiList: ["chooseWXPay"]
            });
            dispatch(initSdk())
        }
    }

    payOrder() {
        let config = this.props.state.wxConfig;
        wx.ready(function(){
            wx.chooseWXPay({
                timestamp: config.timeStamp,
                nonceStr: config.nonceStr,
                package: "prepay_id=" + config.prepayId,
                signType: "MD5",
                paySign: config.paySign,
                success: function(r){
                    //todo redirect to
                },
                fail: function(r){
                    //todo
                    console.log('fail')
                },
                cancel: function(r){
                    //todo
                    console.log('cancel')
                }
            });
        });
    }

	render(){
        let props = this.props.state.orderInfo;

        let productItems = props.productItems.map(
            (productItem, index) =>
                <TotalProducts key={index} productItem={productItem}/>
        );
        return(
            <div className='orderDetailContainer'>
                <div className="buttonArea clearfix">
                    <span className='font14'>剩余支付时间： {props.remainTime}</span>
                </div>
                {productItems}
                <div className="totalArea">
                    <AccountDisplay name='商品总金额' money={props.actualMoney}/>
                    <AccountDisplay name='商品优惠总计' money={props.productDiscount}/>
                    <AccountDisplay name='总金额优惠总计' money={props.limitDiscount}/>
                </div>
                <div className='font14 totalMoney'>
                    <AccountDisplay name='应付金额' money={props.totalMoney}/>
                </div>
                <Button buttonClassName={'weiXinPay'}
                        buttonText={'微信支付'+props.totalMoney+'元'}
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