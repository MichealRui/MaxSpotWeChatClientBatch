'use static';

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
						<h1 className='font20'>{props.shopName}</h1>
						<p className='font16'>购物单编号：{props.order.orderNumber}</p>
					</div>
					<div className='settleCount'>
						<h1 className='font20'>￥ <em className='font28'>{props.order.totalPrice / 100 || 0}</em></h1>
					</div>
				</div>
				<div className="qrCodeContainer">
					<ReactQrCode value={props.payUrl}/>
				</div>
				<p className='settleQRCodeIntroduce font14'>
					请对方打开微信端主页，点击右上方"+"图标，进入"扫一扫"功能，并对准上方二维码进行扫码支付
				</p>
        		{/*<Button buttonText="支付成功" buttonClass="paySuccess" />*/}
        		<Button
					buttonClass="enable"
					buttonText="支付遇到问题"
					buttonClick={this.failClick.bind(this)}
				/>
			</div>
		);
	}
}

