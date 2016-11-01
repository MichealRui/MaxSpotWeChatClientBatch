'use strict';

require('./index.css');
import React from 'react';

export default class BrandItem extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		let props = this.props;
		console.log(11);
		console.log(props);
		return (
			<div className="iteminfo">
				<img src="./a.png" />
				<div>
					<div className="font20">Jingle Bells</div>
					<div className="">超级好吃的饼干超级好吃的饼干超级好吃的饼干</div>
					<div className="font16">净含量：40g 颜色：橙色</div>
				</div>
				<div className="money fl">80<span>元</span></div>
				<div className="plus fr">+</div>
			</div>
		);

	}
}