'use strict';

import React from 'react';
import AccountDisplay from '../AccountDisplay/AccountDisplay';
require ('./index.css');

export default class OrderDetailProductItem extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props.productItemDetail;
		return(
			<li className='orderDetailProductItemContainer'>
				<div className='productInfo'>
					<img src={props.productImg} className='productImg' />
					<span className='brandProductContainer'>
						<p className='productName font12'>{props.productName}</p>
						<p className='productDesc font14'>{props.productDesc}</p>
						<p className='productTaste font10'>{props.productTaste}</p>
					</span>
					<span className='quantity font14'><i>x</i>{props.quantity}</span>
					<span className='unitPrice font14'>{props.unitPrice}元</span>
				</div>
				<div className='buyDiscount'>
					<AccountDisplay name='买减优惠' money='-15'/>
				</div>
				<div className="totalArea">
					<AccountDisplay name='商品总金额' money='200'/>
					<AccountDisplay name='商品优惠总计' money='-18'/>
					<AccountDisplay name='总金额优惠总计' money='-10'/>
				</div>
			</li>
		);
	}
}