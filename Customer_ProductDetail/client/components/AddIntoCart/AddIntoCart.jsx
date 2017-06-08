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
		let btn_text = props.productCount > 0 ? '加入购物车': '售 罄'
		let btn_class = props.productCount > 0 ? 'addProduct': 'addProduct empty'
		return(
			<div className="addIntoCart">
				<div className='wrapper'>
					<h1 className='font16'>￥<span className='font24'>{props.productCost}</span></h1>
					<p className='font12'>库存 {props.productCount}件</p>
				</div>
				<div className='buttonArea'>
					<Button buttonClassName={btn_class} buttonClick={()=>props.addIntoCartClick()} buttonText={btn_text}/>
				</div>
			</div>
		);
	}
}