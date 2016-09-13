'use strict';

import React from 'react';
require('./index.css');

export default class ProductSlider extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let sliders = [];
		let iconArr = [];
		let productImgs = this.props.productImgs;
		productImgs.map((img, index)=>{
			sliders.push(<li key={index}><img src={img.imgSrc} /></li>);
			if(index==1){
				iconArr.push(<li className='active'><span></span></li>);
			}else {
				iconArr.push(<li><span></span></li>);
			}
		});
		return (
			<div className="productSliderContainer">
				<ul className='sliders'>
					{sliders}
				</ul>
				<ul className='icons'>
					{iconArr}
				</ul>
			</div>
		);
	}
}