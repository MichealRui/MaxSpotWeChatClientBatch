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
			<div className='orderListContaier'>
				<div className='orderListTitle font14'>
					<img src={props.customerImg}/>
					<span>{props.customerName}</span>
					<span className={'orderStatus '+props.orderStatusClass}>{props.orderStatus}</span>
				</div>
				<div className='orderListInfo font14'>
					<p>
						<span className='orderCost'>￥ {props.orderCost}</span>
						<span className='orderDate'>{props.orderDate}</span>
					</p>
					<OrderProductItemList productItemList={props.productItemList} />
				</div>
			</div>
		);
	}
}