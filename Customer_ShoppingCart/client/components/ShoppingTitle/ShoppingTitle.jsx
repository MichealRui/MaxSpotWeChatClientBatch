'use strict';

import React from 'react';
require('./index.css');

export default class ShoppingTitle extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		const props = this.props;
		return (
			<div className="titleContainer">
				<span className="icon iconSucc fa fa-check font14"></span>
				<span className="machineAddress font14">{props.machineAddress}</span>
				<span className="status statusSucc font14">{props.statusText}</span>
			</div>
		);
	}
}