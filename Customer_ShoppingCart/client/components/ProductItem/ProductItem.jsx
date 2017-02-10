'use strict';

import React from 'react';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import ProductControl from './ProductControl/ProductControl.jsx';
import ProductPrice from './ProductPrice/ProductPrice';
require('./index.css');
export default class ProductItem extends React.Component{
	constructor(props){
		super(props);
	}
	
	render(){
		const props = this.props;
		const PRODUCT_OUT_SELL= 1; //下架
		const PRODUCT_EMPTY_SELL= 2; //售罄
		const PRODUCT_ON_SELL = 1 ; //在售
		const PRODUCT_LOW_STOCK = 3 //库存不足
        return (
			<li className='itemWrap'>
				<ProductInfo data={props.data} />
				<ProductPrice data={props.data} editStatus="true"/>
				<ProductControl data = {props.data}
								deleteItem={this.props.delete}
								increaseItem={this.props.increase}
								decreaseItem={this.props.decrease}
				/>
				<div className={(props.data.err_status == PRODUCT_OUT_SELL || props.data.err_status == PRODUCT_EMPTY_SELL ? 'layer' : '')}></div>
			</li>
      	)
	}
}