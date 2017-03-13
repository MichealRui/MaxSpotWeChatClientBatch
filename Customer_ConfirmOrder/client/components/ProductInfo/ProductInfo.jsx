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
					<div className="productImg">
						<img src={'http://114.215.143.97' + sku.imagePath} className='productImg' />
						{
							sku.isPresent ?
								<span className={"giftBanner font12 activate"}>赠品</span> : null
						}

					</div>
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