'use strict';
import React from 'react'
import ReactQrCode from 'qrcode.react'
require('./index.css');

export default class RemindContent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            timer:null,
            alertMax : 30,
            sleepTime : 1000,
        }
        this.alertMax = 30;
    }

    componentDidMount() {
        this.setState({
            alertMax : 30
        });
        this.countBack()
    }

    componentWillUnmount() {
        window.clearTimeout(this.state.timer);
    }

    componentWillReceiveProps(nextProps){
        window.clearTimeout(this.state.timer);
        // this.state.alertMax = 30;
        this.setState({
            alertMax : 30
        });
        if(this.state.alertMax > 0 ){
            this.countBack();
        }
        console.log("componentWillReceiveProps")
    }

    countBack(){
        console.log(this.state.alertMax)
        this.setState({
            alertMax : this.state.alertMax - 1
        });
        if(this.state.alertMax >= 0){
            this.state.timer =
                window.setTimeout(() => this.countBack() ,1000)
        }else{
            window.clearTimeout(this.state.timer);
            if(this.props.cartVisible){
                this.props.clearCart();
            }else{
                this.props.onCancel();
            }
        }
    }

    render () {
        let textInfo = !this.props.cartVisible ? '请点击"继续购物"让我知道，否则购物袋会在30秒内自动清空哦。':
            '请点击"继续支付"让我知道，否则您的订单会在30秒内自动取消哦。';
        let btnInfo = !this.props.cartVisible ? '继续购物' : '继续支付';
        return (
            <div className="remindContent">
                <div className="remindTitle font40">Hi,你还在吗？</div>
                <div className="remindText font32">{textInfo}</div>
                <div className="remindBtn font32">
                    <div className="btnTag btnLetf" onClick={()=>this.props.onCancel()}>{btnInfo}（{this.state.alertMax}s）</div>
                    <div className={"btnTag btnRight " + (this.props.cartVisible ? '' : 'hide')} onClick={()=>this.props.clearCart()}>清空购物袋</div>
                </div>
            </div>
        )
    }
}