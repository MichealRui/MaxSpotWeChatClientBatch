'use strict';

require('./index.css');
import React from 'react';

export default class AddCart extends React.Component {
	constructor(props){
		super(props);
	}
	addCart(){
		this.props.itemClick(
			{
				storeId: this.props.itemInfo.storeid + '',
				skuId: this.props.itemInfo.skuid + '',
				count: '1'
			}
		)

	}
	render(){
		return (
			<div className="button font22" onClick={this.addCart.bind(this)}>+</div>
		);
	}
}