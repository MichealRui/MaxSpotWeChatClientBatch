'use strict';

require('./index.css');
import React from 'react';

export default class header extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		const item = props.iteminfo;
		return (
			<div className="header">
				<div className="title clearfix">
					<span><img src={item.logo} /></span>
					<span>
						<p className="font16">{item.name}</p>
						<p className="font12">共有{item.follows}人关注</p>
					</span>
					<span className="button font16">关注</span>
				</div>
			</div>

		);
	}
}