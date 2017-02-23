'use strict';

import React from 'react';
import AccountDisplay from '../AccountDisplay/AccountDisplay'
require ('./index.css');

export default class OrderProductInfo extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		let sku = props.product.sku;
		return(
			<li className='orderProductInfo'>
				<div className='productInfo'>
					<img src={sku.imagePath} className='productImg' />
					<span className='orderProductContainer'>
						<p className='productName font12'>{sku.brandName}</p>
						<p className='productDesc font14'>{sku.shortName}</p>
						<p className='productTaste font10'>{sku.categoryName}</p>
					</span>
					<span className='quantity font14'><i>x</i>{props.product.count}</span>
					<span className='unitPrice font14'>{props.product.sellPrice / 100}元</span>
				</div>
				{
					props.product.showPrice ? (
						<div className="totalArea">
							<AccountDisplay name='商品总金额' money={props.product.count * props.product.sellPrice /100}/>
						</div>
					):''
				}

			</li>
		);
	}
}

OrderProductInfo.PropTypes = {
	product : React.PropTypes.object
}
OrderProductInfo.defaultProps = {
	product : {
		sku : {
			imagePath:'',
			brandName : '',
			shortName : '',
			categoryName : ''
		},
		count : 0,
		sellPrice : 0,
		showPrice : false
	}
}