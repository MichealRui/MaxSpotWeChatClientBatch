'use strict';

require('./index.css');
import React from 'react';

export default class CouponItem extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		console.log("header");
		return (
			<div className="homeheader">
				<img src='' className="logo" />
				<div className="name">
					<p>123</p>
					<p className="font20">共有234人关注</p>
				</div>
				<span className="button follow f20">关注</span>
			</div>

		);
	}
}