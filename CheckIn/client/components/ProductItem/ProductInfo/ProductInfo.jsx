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
					<p className='productName'>{props.productName}</p>
					<p className='productDesc'>{props.productDesc}</p>
					<p className='productTaste'>{props.productTaste}</p>
				</div>
			</div>
		)
	}
}