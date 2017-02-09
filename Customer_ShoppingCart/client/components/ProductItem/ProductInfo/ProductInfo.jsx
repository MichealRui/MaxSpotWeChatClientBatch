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
				<div className="productImg">
					<img src={props.imagePath}/>
				</div>
				<div className="wrapper">
					<p className='productName font12'>{props.brandName} {props.name} {props.categoryName}</p>
				</div>
			</div>
		)
	}
}