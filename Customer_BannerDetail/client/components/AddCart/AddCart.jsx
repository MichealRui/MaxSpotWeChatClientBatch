'use strict';

require('./index.css');
import React from 'react';
import add_image from '../timer/image/plus.png'

export default class AddCart extends React.Component {
	constructor(props){
		super(props);
	}
	addCart(e){
		e.stopPropagation();
		this.props.itemClick(
			{
				storeId: this.props.storeId,
				skuId: this.props.itemInfo.id + '',
				count: '1'
			}
		)

	}
	render(){
		return (
			<div className="button font22" onClick={this.addCart.bind(this)}><img src={add_image} alt=""/></div>
		);
	}
}