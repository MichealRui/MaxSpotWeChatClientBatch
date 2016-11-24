'use strict';

import React from 'react';
import Button from '../Button/Button.jsx';
import ReactQrCode from 'qrcode.react';
require('./index.css');

export default class SettleCollection extends React.Component {
	constructor(props){
		super(props);
	}
	
	failClick() {
		this.props.onFailClick()
	}
    
	render(){
		let props = this.props.order;
		return (
			<div className='settleContainer'>
				<div>
					<div className='shopName'>
						<h1 className='font20'>{props.store.name}</h1>
						<p className='font16'>购物单编号：{props.orderNumber}</p>
					</div>
					<div className='settleCount'>
						<h1 className='font20'>￥ <em className='font28'>{props.totalPrice / 100 || 0}</em></h1>
					</div>
				</div>
				<div className="qrCodeContainer">
					<ReactQrCode value={this.props.takeuri}/>
				</div>
				<p className='settleQRCodeIntroduce font14'>
					请在小怪兽售卖机扫码或请对方打开微信端主页，点击右上方"+"图标，进入"扫一扫"功能，并对准上方二维码进行扫码支付
				</p>
        		{/*<Button buttonText="支付成功" buttonClass="paySuccess" />*/}
        		<Button
					buttonClass="enable"
					buttonText="取货遇到问题"
					buttonClick={this.failClick.bind(this)}
				/>
			</div>
		);
	}
}

