'use strict';
import React from 'react'
import ReactQrCode from 'qrcode.react'
require('./index.css');

export default class QrContent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            sleepTime:2000,
            timer:null
        }
    }

    fetchOrderStatus() {
        let {order, fetchOrder, setCartTaking} = this.props;
        let PAID = '3';
        if(order.status != PAID) {
            fetchOrder(order.orderNumber);
            this.state.timer = window.setTimeout( () => this.fetchOrderStatus(), this.state.sleepTime)
        } else {
            setCartTaking();
        }
    }

    componentWillUnmount() {
        window.clearTimeout(this.state.timer);
    }

    componentWillMount() {
        this.fetchOrderStatus.bind(this)()
    }

    render () {
        // let qr = this.props.qr;
        // console.log(qr);
        let props = this.props;
        let campaignList = props.campaignList;
        let camList = campaignList && campaignList.length > 0 ?
            campaignList.filter((campaign,index)=> campaign.campaignName && campaign.totalDiscount && campaign.totalDiscount > 0
            ) : [];
        // let qr = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4da5ecd6305e620a&redirect_uri=http%3A%2F%2Ftest.mjitech.com%2Fweb%2Fwxauthorize.action&response_type=code&scope=snsapi_base&state=turn_to_wxpay_SO20170519113613001#wechat_redirect"
        let qr = props.qr;
        let size = 235;
        return (
            <div className="qrcode clearfix">
                <div className="code clearfix">
                    <ReactQrCode size={size} value={qr}/>
                    <div className="codeText font30">微信扫一扫支付</div>
                </div>
                <div className="cartInfo">
                    <h3 className="font24"><span className="cartName">商品总金额</span><span className="cartMoney">{props.totalPrice}元</span></h3>
                    <h3 className="campaignInfo">
                        <div className="font24"><span className="cartName">优惠总计</span><span className="cartMoney">-{props.totalDiscount}元</span></div>
                        <ul>
                            {
                                camList && camList.length>0 ?
                                    camList.map(
                                        (cam,index)=>{
                                            return (
                                                <li key={index} className="font22"><span span className="cartName">{cam.campaignName}</span><span className="cartMoney">-{cam.totalDiscount/100}元</span></li>
                                            )
                                        }
                                    ) : ''
                            }
                        </ul>
                    </h3>
                    <h3 className="font26 totalMoney"><span className="cartName">应付金额</span><span className="cartMoney font38">
                        {((props.totalPrice * 100 - props.totalDiscount * 100)/100).toFixed(1) }
                        </span></h3>
                </div>
            </div>
        )
    }
}