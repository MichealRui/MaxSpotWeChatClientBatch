'use strict';

require('./index.css');
import React from 'react';
// import smileImg from './images/smile.png';
import {Link} from 'react-router'
export default class PaySuccessHeader extends React.Component {
	constructor(props){
		super(props);
	}

	onContinueClick() {
	    window.location.href = ENV.domain + '/buyer_home/index.html'
    }

	render(){
		let props = this.props;
		return (
			<div className="PaySuccessHeader">
				<div className="smile">
					<img src={require('./images/succ_icon.png')}/>
				</div>
				<div className="title black font22">订单支付成功</div>
				<div className="text b5b5b5 font12">
					<p>货物已为您准备好</p>
					<p>请及时前往相应的店铺/机器取货</p>
				</div>
				<div className="btn_all clearfix">
					<Link to="/">
						<div className="btn_fetch c_999 font14 fl" >继续购物</div>
					</Link>
					<Link to="/orderList">
						<div className="btn_fetch c_999 font14 fr" >查看订单</div>
					</Link>
				</div>
			</div>
		);
	}
}