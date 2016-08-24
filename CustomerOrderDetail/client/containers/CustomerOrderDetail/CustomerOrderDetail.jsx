'use static';

import React from 'react';
import OrderDetailProductList from '../../components/OrderDetailProductList/OrderDetailProductList';
import CustomerOrderDetailData from './CustomerOrderDetailData';
require('./index.css');

export default class CustomerOrderDetail extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = CustomerOrderDetailData;
		return(
			<div className='orderDetailContainer'>
				<div className='orderDetailTitle'>
					<span>{props.orderName}</span>
					<span className={'orderStatus '+props.orderStatusClass}>{props.orderStatus}</span>
				</div>
				<div className='orderDetailNumber'>
					<span>订单编号</span>
					<span>{props.orderNumber}</span>
				</div>
				<div className='orderDetailDate'>
					<span>交易时间</span>
					<span>{props.orderDate}</span>
				</div>
				<OrderDetailProductList orderDetailProductList={props.orderDetailProductList}/>
			</div>
		);
	}
}