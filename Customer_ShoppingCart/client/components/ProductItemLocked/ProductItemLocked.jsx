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
		return (
			<li className="editItem font14 ">
				<ProductInfo data={product}/>
				<ProductPrice data={product} editStatus="false"/>
				<div className={(product.err_status == 1 ? 'layer' : '')}></div>
			</li>
		);
	}
}