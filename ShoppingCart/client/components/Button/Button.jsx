'use strict';

require('./index.css');
import React from 'react';

export default class Button extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<div className={'bigButton font16 '+props.buttonClassName} onClick={props.buttonClick}>
				{props.buttonText}
			</div>
		);
	}
}