'use strict';

require('./index.css');
import React from 'react';

export default class ProductDetailTitle extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<div className='productDetailTitle'>
				<div className="titleContent">
					<h2 className='font12'>{props.productStore}</h2>
					<h1 className='font14'>{props.productName}</h1>
					<p className='font12'>{props.productInfo}</p>
				</div>
				<span className="fa fa-heart font24 icon"></span>
			</div>
		);
	}
}