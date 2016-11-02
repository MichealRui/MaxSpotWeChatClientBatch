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
			<div className="homeheader">
				<ul>
					<li><img src={item.logo} className="logo" /></li>
					<li>
						<div className="name">
							<p>{item.name}</p>
							<p>共有{item.follows}人关注</p>
						</div>
					</li>
					<li>
						<span className="button follow f20">关注</span>
					</li>
				</ul>



			</div>

		);
	}
}