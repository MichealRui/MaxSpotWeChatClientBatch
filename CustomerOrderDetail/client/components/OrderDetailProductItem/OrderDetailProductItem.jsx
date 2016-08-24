'use static';

import React from 'react';
require('./index.css');

export default class OrderDetailProductItem extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props.productItemDetail;
		return(
			<li className='orderDetailProductItemContainer'>
				<img src={props.productImg} />
				<span className='brandProductContainer'>
					<p>{props.brandName}</p>
					<p>{props.productName}</p>
				</span>
				<span className='unitPrice'>￥ {props.unitPrice}</span>
				<span className='quantity'>x {props.quantity}</span>
				<span className='amount'>￥ {props.amount}</span>
			</li>
		);
	}
}