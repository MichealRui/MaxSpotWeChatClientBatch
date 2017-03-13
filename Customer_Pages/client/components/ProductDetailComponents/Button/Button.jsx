'use strict';

require('./index.css');
import React from 'react';

export default class Button extends React.Component {
	constructor(props){
		super(props);
	}
	addClick(e){
		e.stopPropagation();
		this.props.buttonClick(
			{
				storeId: this.props.data.storeId + '',
				skuId: this.props.data.skuId + '',
				count: '1'
			}
		)
	}
	render(){
		let props = this.props;
		return (
			<div className={'bigButton font16 '+props.buttonClassName} onClick={this.addClick.bind(this)}>
				{props.buttonText}
			</div>
		);
	}
}