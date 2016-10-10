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
			<p className='accountDisplay clearfix font14'>
				<span className='money'>{props.money}元</span>
				<span className='name'>{props.name}</span>
			</p>
		);
	}
}