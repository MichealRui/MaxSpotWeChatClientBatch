'use strict';

require ('./index.css');
import React from 'react';
import shopImg from './images/shop.jpg'

export default class ShopItem extends React.Component {
	constructor(props){
		super(props);
	}

    shopClick() {
        let id = this.props.id;
        window.location.href = ENV.domain + '/buyer_shopdetail/index.html?storeid=' + id
    }

	render(){
		let props = this.props;
		return (
			<div className='shopItem' onClick={this.shopClick.bind(this)}>
				<img src={shopImg} className='shopImg' />
				<div className='infoArea'>
					<h1 className='font16'>{props.name}<span className="font14">i</span></h1>
					<p className='font14'>{props.address}</p>
				</div>
				<span className="font20"> > </span>
				{/*<span className='fa fa-angle-right orderAddressArrow font24'></span>*/}
			</div>
		);
	}
}