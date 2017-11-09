'use strict';

import React from 'react';
import Button from '../../CommonComponents/Button/Button';
import ButtonHow from '../../CommonComponents/ButtonHow/ButtonHow';
import ReactQrCode from 'qrcode.react';
require('./index.css');

export default class SettleCollection extends React.Component {
	constructor(props){
		super(props);
	}
	
	failClick() {
		this.props.onFailClick()
	}

	showTipClick(){
		this.props.onShowTips();
	}
    
	render(){
		let props = this.props.order;
		return (
			<div className='settleContainer'>
				<div className="settleContainer_top">
					<div className='shopName'>
						<h1 className='font20'>
							<span className="fa fa-map-marker map_mark font30"></span>
							{props.store.name}</h1>
						<h5 className='font12'>{props.store.address}</h5>
						{/*<p className='font16'>购物单编号：{props.orderNumber}</p>*/}
					</div>
					<ButtonHow
						buttonClick={this.showTipClick.bind(this)}
						buttonClass="howGet"
						faClass="fa-question-circle font34"
						buttonText = '如何取货'
					/>
					{/*<div className='settleCount'>
					 <h1 className='font20'>￥ <em className='font28'>{props.totalPrice / 100 || 0}</em></h1>
					 </div>*/}
				</div>
				<div className="qrCodeContainer">
					<ReactQrCode value={this.props.takeuri} size={256}/>
				</div>
				<p className='settleQRCodeIntroduce font14'>
					{/*请在设备出货口旁对准“取货扫码区”扫此码取货，扫码成功时会听到“滴”的一声。*/}
					请将手机屏幕对准店铺机身扫码区
				</p>
				{/*<Button buttonText="支付成功" buttonClass="paySuccess" />*/}
				<Button
				 buttonClassName="enable"
				 buttonText="取货遇到问题"
				 buttonClick={this.failClick.bind(this)}
				 />
				{/*<p class="font16" id="footer" onClick={this.failClick.bind(this)}>取货遇到问题</p>*/}
			</div>

		);
	}
}

SettleCollection.PropTypes = {
	order : React.PropTypes.object,
	takeuri : React.PropTypes.string
};
SettleCollection.defaultProps = {
	order : {
		store : {
			name: ''
		},
		totalPrice : 0,
		orderNumber : ''
	},
	takeuri : ''
};


