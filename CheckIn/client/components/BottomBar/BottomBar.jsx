'use strict';
import React from 'react';
import fetch from 'isomorphic-fetch';
require('./index.css');
export default class BottomBar extends React.Component{
	constructor(props){
		super(props);
	}
	
	createOrderClick() {
		let itemList = this.props.itemList;
		let dispatchError = this.props.onError;
		fetch('http://localhost:9000/createOrder',
			{
				'method': 'POST',
				'mode': 'cors',
				'cache': 'default',
				"Origin": "*",
				body: JSON.stringify(itemList.map((item) =>  {
					return {skuId: item.skuId, count: item.count}
				}))
			}
		).then(response => response.json())
			.then(json => {
				if(json.is_succ) {
				//	todo redirect to qrcode scan page
				} else {
					dispatchError("服务器错误,请刷新页面或联系商家")
				}
			})
	}

	render(){
		let props = this.props;
		return(
			<div className='bottomBar'>
				<span>总金额：<em>{props.totalMoney || 0}</em><i>元</i></span>
				<span className="button settleButton J_createOrder" onClick={this.createOrderClick.bind(this)}>结算</span>
			</div>
		)
	}
}