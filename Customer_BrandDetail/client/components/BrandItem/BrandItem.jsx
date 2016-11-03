'use strict';

require('./index.css');
import React from 'react';
import AddCart from '../AddCart/AddCart'
export default class BrandItem extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		let props = this.props;
		const item = props.iteminfo;
		return (
			<li>
				<div className="brandItem">
					<div className="img"><img src={item.image}/></div>
					<p className="font12">{item.brand}</p>
					<p className="font14">{item.name}</p>
					<p className="font10">{item.sub}</p>
					<div className="price font18">{item.money}<span className="font10">元</span></div>
					<AddCart itemInfo={item} itemClick={this.props.addToCart}/>
				</div>
			</li>
		);

	}
}