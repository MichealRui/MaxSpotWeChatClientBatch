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
		let props = this.props.settleInfo;
		return (
			<div className='settleContainer'>
				<div>
					<span className='shopName'>
						<h1>{props.shopName}</h1>
						<p>购物单编号：{props.shopListNumber}</p>
					</span>
					<span className='settleCount'>
						<p>收款金额</p>
						<h1>￥ {props.settleCount}</h1>
					</span>
				</div>
				<div className="qrCodeContainer">
					<ReactQrCode value={props.settleQRCode}/>
				</div>
				<p className='settleQRCodeIntroduce'>
					请对方打开微信端主页，点击右上方"+"图标，进入"扫一扫"功能，并对准上方二维码进行扫码支付。
				</p>
        		<Button buttonText="支付成功" buttonClass="paySuccess" />
        		<Button buttonText="支付遇到问题"
						buttonClass="payFailed"
						buttonClick={this.failClick.bind(this)}
				/>
			</div>
		);
	}
}

