'use strict';

require('./index.css');
import React from 'react';
import smileImg from './images/paysucc_icon.png';

export default class Header extends React.Component {
	constructor(props){
		super(props);
	}

	onContinueClick() {
	    window.location.href = ENV.domain + '/buyer_home/index.html'
    }

    onOrderClick() {
    	if(this.props.orderLength > 1) {
			window.location.href = ENV.domain + '/buyer_orderlist/index.html'
		} else {
			window.location.href = ENV.domain + '/buyer_orderdetail/index.html?order_number=' + this.props.orderNumber
		}

	}

	render(){
		let props = this.props;
		return (
			<div className="header">
				<div className="smile">
					<img src={smileImg}/>
				</div>
				<div className="title black font18">订单支付成功</div>
				<div className="text gray font12">
					<p>货物已为您准备好</p>
					<p>请及时前往相应的店铺/机器取货</p>
				</div>
				<div className="buttons">
					<div className="btn_fetch darkGray left font13" onClick={this.onContinueClick.bind(this)}>继续购物</div>
					<div className="btn_fetch darkGray right font13" onClick={this.onOrderClick.bind(this)}>查看订单</div>
				</div>
			</div>
		);
	}
}