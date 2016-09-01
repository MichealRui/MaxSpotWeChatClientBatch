'use strict';

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
				<img src={props.productImg} className='productImg' />
				<span className='brandProductContainer'>
					<p className='productName font12'>{props.productName}</p>
					<p className='productDesc font14'>{props.productDesc}</p>
					<p className='productTaste font10'>{props.productTaste}</p>
				</span>
				<span className='quantity font14'><i>x</i>{props.quantity}</span>
				<span className='unitPrice font14'>{props.unitPrice}元</span>
			</li>
		);
	}
}