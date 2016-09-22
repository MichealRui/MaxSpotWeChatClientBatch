'use strict';

import React from 'react';
require('./index.css');

export default class OrderDetailProductItem extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
	    let props = this.props.productItemDetail;
        let sku = props.sku
        return(
		    <li className='orderDetailProductItemContainer'>
                <img src={sku.imagePath} className='productImg' />
                <span className='brandProductContainer'>
                    <p className='productName font12'>{sku.brandName}</p>
                    <p className='productDesc font14'>{sku.name}</p>
                    <p className='productTaste font10'>{sku.categoryName}</p>
                </span>
                <span className='quantity font14'><i>x</i>{props.count}</span>
                <span className='unitPrice font14'>{props.sellPrice / 100 || 0}元</span>
			</li>
		);
	}
}