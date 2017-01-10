'use strict';

import React from 'react';
require ('./index.css');

export default class ProductInfo extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props.product;
		let sku = props.sku;
		return(
			<li className='productInfoContainer'>
				<div className='productInfo'>
					<img src={sku.imagePath} className='productImg' />
					<span className='brandProductContainer'>
						<p className='productName font12'>{sku.brandName}</p>
						<p className='productDesc font14'>{sku.shortName}</p>
						<p className='productTaste font10'>{sku.categoryName}</p>
					</span>
					<span className='quantity font14'><i>x</i>{props.count}</span>
					<span className='unitPrice font14'>{props.sellPrice / 100}元</span>
				</div>
			</li>
		);
	}
}