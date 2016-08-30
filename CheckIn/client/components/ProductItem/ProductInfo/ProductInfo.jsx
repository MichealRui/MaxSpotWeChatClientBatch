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
					<p className='productName font12'>{props.productName}</p>
					<p className='productDesc font14'>{props.productDesc}</p>
					<p className='productTaste font10'>{props.productTaste}</p>
				</div>
			</div>
		)
	}
}