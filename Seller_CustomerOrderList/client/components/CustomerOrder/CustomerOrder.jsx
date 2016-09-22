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
					<span>订单号: {props.orderNumber}</span>
					{/*<span>{props.customerName}</span>*/}
					<span className={'orderStatus '+props.orderStatusClass}>{props.orderStatus}</span>
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