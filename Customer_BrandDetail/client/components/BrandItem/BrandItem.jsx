'use strict';

require('./index.css');
import React from 'react';
import AddCart from '../AddCart/AddCart'
export default class BrandItem extends React.Component {
	constructor(props){
		super(props);
	}

	getAttr(attributes) {
		var atts = <br/>;
		if(attributes && attributes.length > 0) {
			atts = attributes.map(att => {
				if(att.value) {
					return att.value + att.unit
				} else return ''
			}).reduce((pre, next) => pre + next + ' ', '')
		}
		return atts
	}

	render(){
		let props = this.props;
		const item = props.iteminfo;
		let atts = this.getAttr(item.attributes);
        console.log(item)
		return (
			<li>
				<div className="brandItem">
					<div className="img"><img src={ENV.domain + item.imagePath}/></div>
					<p className="font12">{item.brand}</p>
					<p className="font14">{item.name}</p>
					<p className="font10">{atts}</p>
					<div className="price font18">{item.sellprice}<span className="font10">元</span></div>
					<AddCart itemInfo={item} itemClick={this.props.addToCart}/>
				</div>
			</li>
		);

	}
}