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

        if(cart.length == 0) {
            return false;
        }

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
                    window.location.href =
                        'http://www.mjitech.com/seller_checkout/index.html?order_number=' + json.order.orderNumber
				} else {
					dispatchError(json.error_message)
				}
			})
	}

	render(){
		let props = this.props;
		return(
			<div className='bottomBar'>
				<span>总金额：<em>{props.totalMoney/100 || 0}</em><i>元</i></span>
				<span className="button settleButton J_createOrder"
					  onClick={this.createOrderClick.bind(this)}>结算</span>
			</div>
		)
	}
}