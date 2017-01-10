'use strict';

require ('./index.css');
import React from 'react';

export default class UserLink extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<div className='userLink'>
				<span className='linkName font14'>{props.linkName}</span>
				<span className='fa fa-angle-right orderDetailArrow font24'></span>
				<span className='actionName font12'>{props.actionName||''}</span>
			</div>
		);
	}
}