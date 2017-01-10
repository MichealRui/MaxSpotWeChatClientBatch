'use strict';

import React from 'react';
import ProductInfo from '../ProductItem/ProductInfo/ProductInfo';
require('./index.css');

export default class ProductItemLocked extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
	    const product = this.props.data;
		return (

			<li className='editItem font14'>
				<ProductInfo data={product} />
				<span className='count'>{product.count}</span>
				<span className='icon'>X</span>
				<span className='price'>{product.sellprice / 100}元</span>
			</li>
			// <div className='editContainer'>
			// 	<div className="editTitle">
		     //        <label className={labelClassName} onClick={this.checkboxChange}>
		     //        </label>
		     //        <span className='machineAddress font14'>
		     //          {props.machineAddress}
		     //        </span>
		     //        <span className='editButton font14' onClick={() => console.log('edit')}>
		     //        	编辑
		     //        </span>
			// 	</div>
			// 	<ul>
			// 		{
			// 			props.productList.map((product, index)=>{
			// 				return (
			// 						<li key={index} className='editItem font14'>
			// 							<ProductInfo data={product} />
			// 							<span className='count'>{product.count}</span>
			// 							<span className='icon'>X</span>
			// 							<span className='price'>{product.sellprice}元</span>
			// 						</li>
			// 					);
			// 				})
			// 		}
			// 	</ul>
			// </div>
		);
	}
}