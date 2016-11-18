'use strict';

import React from 'react';
require('./index.css');
export default class Button extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return(
			<div className={'bigButton font16 '+props.buttonClass} onClick={props.buttonClick}>
				{props.buttonText}
			</div>
		)
	}
}