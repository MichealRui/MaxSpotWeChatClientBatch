'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css')

export default class PaySuccHeader extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {

        return (
            <div className="PaySuccHeader">
                <div className="box">
                    <img className="smile" src={require('./image/smile.png')} alt=""/>
                    <div className="text">
                        <p className="font44">恭喜你！订单支付成功</p>
                        <p className="font36">您的微信会收到一个取货二维码，请带着它去右侧出货口扫码取货</p>
                    </div>
                </div>
            </div>

        )
    }
}


