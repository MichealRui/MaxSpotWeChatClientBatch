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
		let stores =  this.props.activateStore.filter(
		    shop => {
                let id = Object.keys(shop).shift();
                // return shop[id].activated && !shop[id].editable
                return shop[id].activated
		    }
        ).map(s => Object.keys(s).shift());
        if(this.props.totalMoney == 0) {
            return false;
        }

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
				console.log(json);
				if(json.is_succ) {
				    window.location.href =
						'http://www.mjitech.com/buyer_confirm/wxpay/index.html?ordernumber=' + json.order.orderNumber;
				//	todo redirect to qrcode scan page
				} else {
					// this.props.onError(json.error_message)
					this.props.onError("部分商品库存不足或已下架");
				}
			})
	}

	render(){
		let props = this.props;
		let stores = this.props.activateStore;
		return(
			<div className='bottomBar'>
				<div>
					<div>
						<p className='totalMoney font14'>总金额：<em>{props.totalMoney || 0}</em><i>元</i></p>

						<p className='remainTime font14'>
                            {/*<span>剩余时间：</span>*/}
                            {/*<Counter remainTime={props.remainTime}*/}
                                     {/*timeUpCallback={props.clearCart}*/}
                            {/*/>*/}
						</p>

					</div>
				</div>
				<span className={"button settleButton J_createOrder font18 " + (props.totalMoney == 0 ? 'disabled': '') }
                      onClick={this.createOrderClick.bind(this)}
                      disabled={props.totalMoney == 0}
                >结算</span>
			</div>
		)
	}
}