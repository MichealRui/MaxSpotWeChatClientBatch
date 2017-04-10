"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { initOrderConfirm } from '../../actions/ConfirmOrder';
import { initWxConfig, initPaySdk } from '../../actions/WeiXin'
import OrderProductList from '../../components/ConfirmOrderComponents/OrderProductList/OrderProductList'
import Button from '../../components/CommoonComponents/Button/Button'
import wx from 'weixin-js-sdk';

require('./index.css')
class ConfirmOrderContainer extends React.Component {
    constructor(props){
        super(props);
        var u = navigator.userAgent;
        this._orderNumber = this.props.params.orderNumber;
        this._isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    }
    componentWillMount(){
        const { dispatch,state } = this.props;
        const link = state.weixin.wechat_url;
        // let wlink = 'http://www.mjitech.com/buyer_pages/index.html#/';
        // dispatch(initWxConfig(link,initOrderConfirm(this._orderNumber)));
        this._isAndroid ?
            dispatch(initWxConfig(link,initOrderConfirm(this._orderNumber))):
            dispatch(initOrderConfirm(this._orderNumber));
    }

    // componentDidUpdate(){
    //     const {dispatch,state} = this.props;
    //     let config = state.weixin.wxConfig;
    //     console.log(config)
    //     if(config.sign && !state.weixin.sdkPayInited){
    //         if(this.initWx(config)) {
    //             dispatch(initPaySdk());
    //         }
    //     }
    // }

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

    payOrder(){
        let config = this.props.state.confirmOrder.wxConfig;
        let appId = 'wx4da5ecd6305e620a';
        let orderNum = this._orderNumber;
        let routers = this.context.router;
        wx.ready(function () {
            wx.chooseWXPay({
                appId: appId,
                timestamp: config.timeStamp,
                nonceStr: config.nonceStr,
                package: config.package,
                signType: "MD5",
                paySign: config.paySign,
                success: function(r){
                    alert("success" + JSON.stringify(r));
                    routers.push('/paySucc/'+orderNum);
                    // let order = Util.getUrlParam().ordernumber;
                    // window.location.href =
                    //     ENV.domain + '/buyer_paysucc/index.html?ordernumber=' + order
                },
                fail: function(r){
                    alert("fail" + JSON.stringify(r));
                    routers.push('/orderList/');
                    // routers.push('/paySucc/'+orderNum)
                    // window.location.href =
                    //     ENV.domain + '/buyer_orderlist/index.html'
                },
                cancel: function(r){
                    //todo
                    //routers.push('/');
                }
            })
        })
    }

    render(){
        let {state,dispatch} = this.props;
        let {confirmOrder,weixin} = state;
        let {orderInfo,is_succ} = confirmOrder;
        return(
            <div className="confirmOrderContainer">
                {
                    is_succ ? (
                        <div>
                            <OrderProductList productList={orderInfo}/>
                            <Button buttonClassName={'weiXinPay'}
                                    buttonText={'微信支付'+ (orderInfo.totalPrice/100 || 0)+'元'}
                                    buttonClick={this.payOrder.bind(this)}
                                    disabled={!weixin.sdkInited}
                            />
                        </div>
                    ) : ''
                }
            </div>
        )
    }
}

ConfirmOrderContainer.contextTypes = {
    router : React.PropTypes.object
};

function select(store) {
    return Object.assign({},{state:store});
}

export default connect(select)(ConfirmOrderContainer);