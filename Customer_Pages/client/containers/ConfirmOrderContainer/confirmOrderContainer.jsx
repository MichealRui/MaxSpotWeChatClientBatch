"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { initOrderConfirm } from '../../actions/ConfirmOrder';
import OrderProductList from '../../components/ConfirmOrderComponents/OrderProductList/OrderProductList'
import Button from '../../components/CommoonComponents/Button/Button'
import wx from 'weixin-js-sdk';

require('./index.css')
class ConfirmOrderContainer extends React.Component {
    constructor(props){
        super(props);
        this._orderNumber = this.props.params.orderNumber;
    }
    componentWillMount(){
        const { dispatch } = this.props;
        dispatch(initOrderConfirm(this._orderNumber));
    }

    payOrder(){
        let config = this.props.state.confirmOrder.wxConfig;
        console.log('config');
        console.log(config);
        let appId = 'wx4da5ecd6305e620a';
        wx.ready(function () {
            wx.chooseWXPay({
                appId: appId,
                timestamp: config.timeStamp,
                nonceStr: config.nonceStr,
                package: config.package,
                signType: "MD5",
                paySign: config.paySign,
                success: function(r){
                    console.log('succes');
                    console.log(r);
                    // let order = Util.getUrlParam().ordernumber;
                    // window.location.href =
                    //     ENV.domain + '/buyer_paysucc/index.html?ordernumber=' + order
                },
                fail: function(r){
                    console.log('fail');
                    console.log(r);
                    // window.location.href =
                    //     ENV.domain + '/buyer_orderlist/index.html'
                },
                cancel: function(r){
                    //todo
                    console.log(r);
                    console.log('cancel')
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

function select(store) {
    return Object.assign({},{state:store});
}

export default connect(select)(ConfirmOrderContainer);