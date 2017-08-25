'use strict';
import React from 'react'
import ReactQrCode from 'qrcode.react'
require('./index.css')

export default class QrContent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            sleepTime:2000,
            timer:null,
            totalTime : 120,
        }
    }

    fetchOrderStatus() {
        let {order, fetchOrder, setCartQr} = this.props;
        let PAID = '2';
        if(order.status != PAID){
            if(this.state.totalTime > 0 && this.props.isModalVisible){
                fetchOrder(order.orderNumber);
                this.countOne();
                this.state.timer = window.setTimeout( () => this.fetchOrderStatus(), this.state.sleepTime)
            }else if(this.state.totalTime > 0 && !this.props.isModalVisible){
                window.clearTimeout(this.state.timer);
            }else{
                this.props.onCancel();
            }
        }else{
            window.clearTimeout(this.state.timer);
            setCartQr();
        }
    }

    countOne(){
        this.setState({
            totalTime: this.state.totalTime - 1
        });
    }

    componentWillUnmount() {
        window.clearTimeout(this.state.timer);
    }

    componentWillMount() {
        this.fetchOrderStatus.bind(this)()
    }

    render () {
        let qr = this.props.qr;
        let size = 270;
        return (
            <div className="qrcode" onClick={() => this.props.setCartTaking()}>
                <div className="code clearfix"><ReactQrCode size={size} value={qr}/></div>
                <div className="payInfo">
                    <div className="title font48">
                        微信扫一扫支付
                        <span className="price">
                            <span className="font32">￥</span>
                            {this.props.order.totalPrice / 100}
                        </span>
                    </div>
                    <div className="text font34">如何支付</div>
                    <div className="iconInfo clearfix">
                        <div className="stepInfo">
                            <div className="icon"><img src={require('./image/4_1.png')} alt=""/></div>
                            <div className="explain font24">
                                <p>第一步：</p>
                                <p>使用手机，进入手机微信</p>
                            </div>
                        </div>
                        <div className="stepInfo">
                            <div className="icon"><img src={require('./image/4_2.png')} alt=""/></div>
                            <div className="explain font24">
                                <p>第二步：</p>
                                <p>点击微信右上方菜单，找到“扫一扫”</p>
                            </div>
                        </div>
                        <div className="stepInfo">
                            <div className="icon"><img src={require('./image/4_3.png')} alt=""/></div>
                            <div className="explain font24">
                                <p>第三步：</p>
                                <p>打开微信扫一扫，扫描屏幕上的二维码</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}