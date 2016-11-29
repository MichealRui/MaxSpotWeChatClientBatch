'use strict';

import React from 'react';
import OrderProductItemList from '../OrderProductItemList/OrderProductItemList';
require('./index.css');

export default class CustomerOrder extends React.Component {
	constructor(props){
		super(props);
	}
    
	render(){
		let props = this.props.order;
		// console.log(props)
		let complete = 'orderComplete';
		let uncomplete = 'orderUnComplete';
		let statusStyle = 'orderStatus '+ (props.status == 2 ? complete: uncomplete);
		console.log(statusStyle)
		return(
			<div className='orderListContaier' >
				<div className='orderListTitle font14'>
					{/*<img src={props.customerImg}/>*/}
					<span>订单号: {props.orderNumber}</span>
					{/*<span>{props.customerName}</span>*/}
					<span className={statusStyle}>{props.statusName}</span>
				</div>
				<div className='orderListInfo font14'
                     onClick={ () =>
                         window.location.href='http://www.mjitech.com/seller_orderdetail/index.html?order_number=' + props.orderNumber}>
					<p>
						<span className='orderCost'>￥ {props.totalPrice / 100 || 0}</span>
						<span className='orderDate'>{props.sellTime}</span>
					</p>
					<OrderProductItemList productItemList={props.skus} />
				</div>
			</div>
		);
	}
}