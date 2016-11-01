'use strict';

require('./index.css');
import React from 'react';

export default class BrandItem extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		let props = this.props;
		const item = props.iteminfo;
		const {addCount} = props.itemMethod;
		console.log(addCount);
		return (
			<div className="iteminfo">
				<img src={item.image} />
				<div>
					<div>{item.brand}</div>
					<div className="">{item.name}</div>
					<div >{item.sub}</div>
				</div>
				<div className="money fl">{item.money}<span>元</span></div>
				<div className="plus fr" onClick={(item)=>addCount(item)}>+</div>
			</div>
		);

	}
}