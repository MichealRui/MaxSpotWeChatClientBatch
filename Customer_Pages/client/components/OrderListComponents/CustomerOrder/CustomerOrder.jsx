'use strict';

import React from 'react';
import OrderProductItemList from '../OrderProductItemList/OrderProductItemList';
import {Link} from 'react-router';
require('./index.css');

export default class CustomerOrder extends React.Component {
	constructor(props){
		super(props);
	}
    
	render(){
		let props = this.props;
		let complete = 'orderComplete';
		let uncomplete = 'orderUnComplete';
		let statusStyle = 'orderStatus '+ (props.orderInfo.status == 2 ? complete: uncomplete);
		return(
			<div className='orderListContaier' >
				<div className='orderListTitle font14'>
					{/*<img src={props.customerImg}/>*/}
					<span>订单号: {props.orderInfo.orderNumber}</span>
					{/*<span>{props.customerName}</span>*/}
					<span className={statusStyle}>{props.orderInfo.statusName}</span>
				</div>
				<Link to={"/orderDetail/"+props.orderInfo.orderNumber}>
				<div className='orderListInfo font14'>
					<p>
						<span className='orderCost'>￥ {props.orderInfo.totalPrice / 100 || 0}</span>
						<span className='orderDate'>{props.orderInfo.sellTime}</span>
					</p>
					<OrderProductItemList productItemList={props.orderInfo.skus} />
				</div>
				</Link>
			</div>
		);
	}
}

CustomerOrder.PropTypes = {
	orderInfo : React.PropTypes.object
};
CustomerOrder.defaultProps = {
	orderInfo: {
		status : 0,
		orderNumber : '',
		statusName : '',
		totalPrice : 0,
		sellTime : '',
		skus : []
	}
}

