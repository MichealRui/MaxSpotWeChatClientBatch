'use strict';

require ('./index.css');
import React from 'react';
import shopImg from './images/shop.jpg'

export default class ShopItem extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<div className='shopItem'>
				<img src={shopImg} className='shopImg' />
				<div className='infoArea'>
					<h1 className='font16'>{props.name}</h1>
					<p className='font12'>{props.address}</p>
					<p className='font12'>{props.shopClass}</p>
				</div>
				{/*<span className='fa fa-angle-right orderAddressArrow font24'></span>*/}
			</div>
		);
	}
}