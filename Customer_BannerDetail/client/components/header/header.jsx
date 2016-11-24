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
				<img src={require('./images/banner.jpg')} alt=""/>
			</div>

		);
	}
}