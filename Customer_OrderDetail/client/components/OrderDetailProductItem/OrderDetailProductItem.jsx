'use strict';

import React from 'react';
import AccountDisplay from '../AccountDisplay/AccountDisplay';
require ('./index.css');

export default class OrderDetailProductItem extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let productItem = this.props.productItemDetail
		let props = this.props.productItemDetail.sku;
		return(
			<li className='orderDetailProductItemContainer'>
				<div className='productInfo'>
					<img src={'http://114.215.143.97' + props.imagePath} className='productImg' />
					<span className='brandProductContainer'>
						<p className='productName font12'>{props.brandName}</p>
						<p className='productDesc font14'>{props.name}</p>
						<p className='productTaste font10'>{props.categoryName}</p>
					</span>
					<span className='quantity font14'><i>x</i>{productItem.count}</span>
					<span className='unitPrice font14'>{productItem.sellPrice /100}元</span>
				</div>
				{/*<div className='buyDiscount'>*/}
					{/*<AccountDisplay name='买减优惠' money='-15'/>*/}
				{/*</div>*/}
				<div className="totalArea">
					<AccountDisplay name='商品总金额' money={productItem.count * productItem.sellPrice /100}/>
					{/*<AccountDisplay name='商品优惠总计' money='-18'/>*/}
					{/*<AccountDisplay name='总金额优惠总计' money='-10'/>*/}
				</div>
			</li>
		);
	}
}