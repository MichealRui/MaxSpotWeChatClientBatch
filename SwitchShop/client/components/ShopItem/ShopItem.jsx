'use strict';

require ('./index.css');
import React from 'react';

export default class ShopItem extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<div className='shopItem'>
				<img src={props.shopImg} className='shopImg' />
				<div className='infoArea'>
					<h1 className='font16'>{props.shopName}</h1>
					<p className='font12'>{props.shopAddress}</p>
					<p className='font12'>{props.shopClass}</p>
				</div>
				<span className='fa fa-angle-right orderAddressArrow font24'></span>
			</div>
		);
	}
}