'use strict';

import React from 'react';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import ProductControl from './ProductControl/ProductControl.jsx';
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
				<ProductControl data = {props.data}
								deleteItem={this.props.delete}
								increaseItem={this.props.increase}
								decreaseItem={this.props.decrease}
				/>
			</li>
      	)
	}
}