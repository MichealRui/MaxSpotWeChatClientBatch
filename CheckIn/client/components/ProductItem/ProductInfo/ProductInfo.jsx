'use strict';

/*require('./index.css');*/

import React from 'react';
require('./index.css');
export default class ProductInfo extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const props = this.props.data;
		return (
			<div className="productInfo">
				<img src={props.productImg} className='productImg'/>
				<div className="wrapper">
					<p className='productName font12'>{props.productBrand}</p>
					<p className='productDesc font14'>{props.productComment}</p>
					<p className='productTaste font10'>{props.productDesc}</p>
				</div>
			</div>
		)
	}
}