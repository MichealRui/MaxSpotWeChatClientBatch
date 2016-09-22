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
		let props = this.props.orderDetail;
		return(
			<div className='orderDetailContainer'>
				{/*<div className="buttonArea">*/}
					{/*<Button buttonClassName='confirmPickUp' buttonClick={()=>console.log('success')} buttonText='确认取货'/>*/}
				{/*</div>*/}
				{/*<div className='orderDetailTitle'>*/}
					{/*<span className="fa fa-th-large font20"></span>*/}
					{/*<span className="orderAddress font14">{props.orderAddress}</span>*/}
					{/*<span className='fa fa-angle-right orderAddressArrow font24'></span>*/}
				{/*</div>*/}
				<div className='orderDetailNumber orderDetailInfo font14'>
					<span>订单编号</span>
					<span>{props.orderNumber}</span>
				</div>
				<div className='orderDetailDate orderDetailInfo font14'>
					<span>交易时间</span>
					<span>{props.sellTime}</span>
				</div>
				{/*<div className='orderDetailLastDate orderDetailInfo font14'>*/}
					{/*<span>最晚提货时间</span>*/}
					{/*<span>{props.orderLastDate}</span>*/}
				{/*</div>*/}
				<div className='orderStatus orderDetailInfo font14'>
					<span>交易状态</span>
					<span>{props.payStatusName}</span>
				</div>
				<OrderDetailProductList orderDetailProductList={props.skus} totalMoney={props.totalPrice / 100 || 0}/>
			</div>
		);
	}
}