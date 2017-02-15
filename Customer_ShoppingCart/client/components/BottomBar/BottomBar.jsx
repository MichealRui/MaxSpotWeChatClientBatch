'use strict';
import React from 'react';
import fetch from 'isomorphic-fetch';
import Counter from '../Counter/Counter';
import { initShoppingCart } from '../../actions/actions'
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
		const PRODUCT_LOW_STOCK = -12; //库存不足
		const PRODUCT_EMPTY_SELL = -15; //售罄
		const PRODUCT_OUT_SELL = -16; //售罄
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
				    window.location.href =
						'http://www.mjitech.com/buyer_confirm/wxpay/index.html?ordernumber=' + json.order.orderNumber;
				//	todo redirect to qrcode scan page
				} else {
					// this.props.onError(json.error_message)
					if(json.orderResults.length > 0){
						let order_res = json.orderResults.filter(
							res => res.is_succ == false
						)
						if(order_res.length > 0){
							let err_msg = order_res[0].error_message
							switch (order_res[0].error_code){
								case PRODUCT_LOW_STOCK:
									err_msg = '部分商品缺货，请编辑购物袋';
									break;
								case PRODUCT_EMPTY_SELL:
								case PRODUCT_OUT_SELL:
									err_msg = "已下架或售罄商品不参与购物结算";
									break;
							}
							this.props.onError(err_msg);
						}else{
							this.props.onError("库存不足或商品售罄");
						}
						dispatch(initShoppingCart())
					}else{
						this.props.onError(json.error_message);
						dispatch(initShoppingCart())
					}

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