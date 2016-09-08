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
				<img src={"http://www.mjitech.com" + props.imagePath} className='productImg'/>
				<div className="wrapper">
					<p className='productName font12'>{props.brandName}</p>
					<p className='productDesc font14'>{props.name}</p>
					<p className='productTaste font10'>{props.categoryName}</p>
				</div>
			</div>
		)
	}
}