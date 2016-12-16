'use strict';
import { Modal, Button } from 'antd';
import React from 'react'
require('./index.css');

export default class AlertDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            count:0,
            timer:null
        }
    }

    countAlertOne() {
        console.log(this.state.count);
        this.setState({
            count : this.state.count - 1
        })
    }

    countAlert() {
        if(this.state.count > 0 && this.props.alertVisible) {
            this.state.timer =
                window.setTimeout(
                    () => {
                        this.countAlertOne();
                        this.countAlert();
                    }, this.props.sleepTime)
        } else if(this.state.count > 0 && !this.props.alertVisible) {
            window.clearTimeout(this.state.timer);
        } else {
            // todo clear cart
            window.clearTimeout(this.state.timer);
            this.clearCart()
        }
    }

    clearCart() {
        this.props.cancel();
        this.props.goBack();
        this.props.clearCart();
    }

    continueBuy() {
        this.props.cancel()
    }

    componentWillMount() {
        this.setState({
            count: this.props.max
        });
        window.clearTimeout(this.state.timer)
    }
    componentDidMount() {
        this.countAlert()
    }

    componentWillUnmount() {
        window.clearTimeout(this.state.timer)
    }

    render() {

        return (
            <Modal visible={this.props.alertVisible}
                   onCancel={this.props.cancel}
                   wrapClassName='vertical-center-modal'
                   closable={false}
                   footer=''
            >
                <div className="alertWrapper">
                    <h2 className="alertTitle font48">
                        Hi, 你还在吗？
                    </h2>
                    <div className="alertDes font34">
                        请点击 "继续购物"，让我知道，否则购物袋会在30秒内自动清空哦。
                    </div>
                    <div className="alertBtn font34" onClick={() => this.continueBuy.bind(this)()}>
                        { "继续购物(" + this.state.count + ")"}
                    </div>
                    <div className="alertBtn font34" onClick={() => this.clearCart.bind(this)()}>
                        清空购物袋
                    </div>
                </div>
            </Modal>
        )
    }

}
