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
		let cart = itemList.map((item) => {
            return {
                sku_id:item.id,
                count:item.count
            }
		});
		fetch('http://www.mjitech.com/web/seller_api/wx_add_order.action',
			{
				'method': 'POST',
				'mode': 'cors',
				'cache': 'default',
				"Origin": "*",
				body: JSON.stringify(
					{
						cart: cart,
						open_id: '123456'
					}
				)
			}
		).then(response => response.json())
			.then(json => {
				if(json.is_succ) {
				//	todo redirect to qrcode scan page
				} else {
					dispatchError(json.error_message)
				}
			})
	}

	render(){
		let props = this.props;
		return(
			<div className='bottomBar'>
				<div>
					<div>
						<p className='totalMoney font12'>总金额：<em>{props.totalMoney || 0}</em><i>元</i></p>
						<p className='remainTime font12'>剩余时间：<em>{props.remainTime || '00:00'}</em></p>
					</div>
				</div>
				<span className="button settleButton J_createOrder font18" onClick={this.createOrderClick.bind(this)}>结算</span>
			</div>
		)
	}
}