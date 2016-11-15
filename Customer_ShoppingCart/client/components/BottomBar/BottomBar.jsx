'use strict';
import React from 'react';
import fetch from 'isomorphic-fetch';
import Counter from '../Counter/Counter';
require('./index.css');

export default class BottomBar extends React.Component{
	constructor(props){
		super(props);
	}
	
	createOrderClick() {
		let itemList = this.props.itemList;
		let dispatchError = this.props.onError;
		// let cart = itemList.map((item) => {
         //    return {
         //        sku_id:item.id,
         //        count:item.count
         //    }
		// });
		let stores = this.props.activateStore;
		const domain = ENV.domain;
		fetch( domain + '/web/buyer_api/submit_carts.ction',
			{
				credentials: 'include',
				method: 'POST',
				mode: 'cors',
				cache: 'default',
				body: JSON.stringify(
					{
						storeIds: stores
					}
				)
			}
		).then(response => response.json())
			.then(json => {
				if(json.is_succ) {
					console.log(json);
				    window.location.href =
						'http://www.mjitech.com/buyer_confirm/wxpay/index.html?ordernumber=' + json.order.orderNumber;
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

						<p className='remainTime font12'>
                            {/*<span>剩余时间：</span>*/}
                            {/*<Counter remainTime={props.remainTime}*/}
                                     {/*timeUpCallback={props.clearCart}*/}
                            {/*/>*/}
						</p>

					</div>
				</div>
				<span className="button settleButton J_createOrder font18" onClick={this.createOrderClick.bind(this)}>结算</span>
			</div>
		)
	}
}