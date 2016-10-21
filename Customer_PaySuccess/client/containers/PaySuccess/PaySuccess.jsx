'use static';

import React from 'react';
import Header from '../../components/Header/Header';
import OrderItem from '../../components/OrderItem/OrderItem';
import PaySuccessData from './PaySuccessData';
require('./index.css');

export default class PaySuccess extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		// let props = this.props.orderDetail;
		// props = CouponData;
		let orderList = PaySuccessData.order;
		console.log(orderList);
		return (
			<div className='PaySuccessContainer'>
				<Header/>
				<ul>
					{
						orderList.map((order, index)=>{
							return <OrderItem key={index} {...order} />
						})
					}
				</ul>
			</div>
		);
	}
}