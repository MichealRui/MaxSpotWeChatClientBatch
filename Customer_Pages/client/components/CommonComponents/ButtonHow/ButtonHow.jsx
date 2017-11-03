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
			<div className={" "+props.buttonClass} onClick={props.buttonClick}>
				<span className={"fa "+props.faClass}></span>
			    <p className="font16">{props.buttonText}</p>
			</div>
		)
	}
}