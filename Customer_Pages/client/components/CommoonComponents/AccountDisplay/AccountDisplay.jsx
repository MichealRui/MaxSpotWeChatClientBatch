'use strict';

require ('./index.css');
import React from 'react';

export default class AccountDisplay extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<p className='accountDisplay font14'>
				<span className='name'>{props.name}</span>
				<span className='money'>{props.money}元</span>
			</p>
		);
	}
}