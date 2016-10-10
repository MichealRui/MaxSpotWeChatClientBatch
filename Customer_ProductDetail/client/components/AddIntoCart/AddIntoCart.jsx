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
		return(
			<div className="addIntoCart">
				<div className='wrapper'>
					<h1 className='font16'>￥<span className='font24'>{props.productCost}</span></h1>
					<p className='font12'>库存 {props.productCount}件</p>
				</div>
				<div className='buttonArea'>
					<Button buttonClassName='addProduct' buttonClick={()=>console.log('addIntoCart')} buttonText={'加入购物车'}/>
				</div>
			</div>
		);
	}
}