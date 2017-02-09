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
        return (
			<li className='itemWrap'>
				<ProductInfo data={props.data} />
				<ProductPrice data={props.data} editStatus="true"/>
				<ProductControl data = {props.data}
								deleteItem={this.props.delete}
								increaseItem={this.props.increase}
								decreaseItem={this.props.decrease}
				/>
				<div className={(props.data.err_status == 1 ? 'layer' : '')}></div>
			</li>
      	)
	}
}