'use strict';

require('./index.css');
import React from 'react';

export default class BrandItem extends React.Component {
	constructor(props){
		super(props);
	}
	addClick() {
		// todo update cart
		console.log('add');
		this.props.itemClick(
			{
				storeId: this.props.brandId + '',
				skuId: this.props.iteminfo.id + '',
				count: '1'
			}
		)
	}
	render(){
		let props = this.props;
		const item = props.iteminfo;

		return (
			<div className="iteminfo">
				<img src={item.image} />
				<div>
					<div>{item.brand}</div>
					<div className="">{item.name}</div>
					<div >{item.sub}</div>
				</div>
				<div className="money fl">{item.money}<span>元</span></div>
				<div className="plus fr" item={item} onClick={this.addClick.bind(this)}>+</div>
			</div>
		);

	}
}