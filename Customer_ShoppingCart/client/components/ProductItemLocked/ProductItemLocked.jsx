'use strict';

import React from 'react';
import ProductInfo from '../ProductItem/ProductInfo/ProductInfo';
import ProductPrice from '../ProductItem/ProductPrice/ProductPrice'
require('./index.css');
import testImg from '../ProductItem/ProductInfo/images/productImg.jpg'

export default class ProductItemLocked extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
	    const product = this.props.data;
		const PRODUCT_OUT_SELL= 1; //下架
		const PRODUCT_EMPTY_SELL= 2; //售罄
		const PRODUCT_ON_SELL = 1 ; //在售
		const PRODUCT_LOW_STOCK = 3 //库存不足
		return (
			<li className="editItem font14 ">
				<ProductInfo data={product}/>
				<ProductPrice data={product} editStatus="false"/>
				<div className={(product.err_status == PRODUCT_OUT_SELL || product.err_status == PRODUCT_EMPTY_SELL ? 'layer' : '')}></div>
			</li>
		);
	}
}