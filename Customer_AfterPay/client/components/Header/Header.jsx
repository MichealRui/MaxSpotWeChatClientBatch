'use strict';

require('./index.css');
import React from 'react';
import logo from '../GetSku/images/name.png';

export default class Header extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<div className="header">
				<img src={logo} />
			</div>
		);
	}
}