'use strict';

import React from 'react';
import ProductInfo from '../ProductItem/ProductInfo/ProductInfo';
import ProductPrice from '../ProductItem/ProductPrice/ProductPrice'
require('./index.css');

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
		const PRODUCT_NORMAL = 0 //正常商品
		return (
			<li className={"editItem font14 " + (product.err_status == PRODUCT_NORMAL ? 'normal':'')}>
				<ProductInfo data={product} isGift={this.props.isGift} activate={this.props.activate}/>
				<ProductPrice data={product} editStatus="false"/>
				<div className={(product.err_status == PRODUCT_OUT_SELL || product.err_status == PRODUCT_EMPTY_SELL ? 'layer' : '')}></div>
			</li>
		);
	}
}