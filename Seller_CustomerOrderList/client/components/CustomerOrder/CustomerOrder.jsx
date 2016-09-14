'use static';

import React from 'react';
import OrderProductItemList from '../OrderProductItemList/OrderProductItemList';
require('./index.css');

export default class CustomerOrder extends React.Component {
	constructor(props){
		super(props);
	}
    
	render(){
		let props = this.props.order;
		return(
			<div className='orderListContaier' >
				<div className='orderListTitle font14'>
					{/*<img src={props.customerImg}/>*/}
					<span> {props.orderNumber}</span>
					{/*<span>{props.customerName}</span>*/}
					<span className={'orderStatus '+props.orderStatusClass}>{props.orderStatus}</span>
				</div>
				<div className='orderListInfo font14'
                     onClick={ (orderNumber) =>
                         window.location.href='www.mjitech.com/seller/wx_order_receipt.html?order_number=' + orderNumber}>
					<p>
						<span className='orderCost'>￥ {props.totalPrice}</span>
						<span className='orderDate'>{new Date(props.sellTime).Format("yyyy-MM-dd HH:mm:ss")}</span>
					</p>
					<OrderProductItemList productItemList={props.skus} />
				</div>
			</div>
		);
	}
}