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
				<img src="" className='productImg'/>
				<div className="wrapper">
					<p>{props.productName}</p>
					<p>{props.productAddress}</p>
					<p>{props.productTaste}</p>
					<p><em className="productCost">{props.productCost}</em></p>
				</div>
			</div>
		)
	}
}