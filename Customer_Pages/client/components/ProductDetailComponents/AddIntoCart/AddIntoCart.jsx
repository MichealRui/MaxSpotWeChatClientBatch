'use strict';

import React from 'react';
import Button from '../Button/Button';
require ('./index.css');

export default class AddIntoCart extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		let btn_text = props.productData.quantity > 0 ? '加入购物车': '缺 货'
		let btn_class = props.productData.quantity > 0 ? 'addProduct': 'addProduct empty';
		let data = {
			skuId : props.productData.id,
			storeId : props.storeId,
			count : "1"
		}
		return(
			<div className="ProductDetailaddIntoCart">
				<div className='wrappers'>
					<h1 className='font16'>￥<span className='font24'>{props.productData.sellprice / 100}</span></h1>
					<p className='font12'>库存 {props.productData.quantity}件</p>
				</div>
				<div className='buttonArea'>
					<Button buttonClassName={btn_class} buttonClick={props.addToCart} buttonText={btn_text} data={data}/>
				</div>
			</div>
		);
	}
}
AddIntoCart.PropTypes = {
	productData : React.PropTypes.object
};
AddIntoCart.defaultProps = {
	productData : {
		sellprice : 0,
		quantity : 0,
		id : 0
	}
};