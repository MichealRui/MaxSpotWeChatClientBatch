'use static';

import React from 'react';
import Button from '../../components/Button/Button';
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
				<div className="buttonArea">
					<Button buttonClassName='confirmPickUp' buttonClick={()=>console.log('success')} buttonText='确认取货'/>
				</div>
				<div className='orderDetailTitle'>
					<span className="fa fa-th-large font20"></span>
					<span className="orderAddress font14">{props.orderAddress}</span>
					<span className='fa fa-angle-right orderAddressArrow font24'></span>
				</div>
				<div className='orderDetailNumber orderDetailInfo font14'>
					<span>订单编号</span>
					<span>{props.orderNumber}</span>
				</div>
				<div className='orderDetailDate orderDetailInfo font14'>
					<span>交易时间</span>
					<span>{props.orderDate}</span>
				</div>
				<div className='orderDetailLastDate orderDetailInfo font14'>
					<span>最晚提货时间</span>
					<span>{props.orderLastDate}</span>
				</div>
				<div className='orderStatus orderDetailInfo font14'>
					<span>取货状态</span>
					<span>{props.orderStatus}</span>
				</div>
				<OrderDetailProductList orderDetailProductList={props.orderDetailProductList} totalMoney={props.totalMoney}/>
			</div>
		);
	}
}