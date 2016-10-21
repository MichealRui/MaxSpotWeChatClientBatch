'use strict';

require('./index.css');
import React from 'react';

export default class OrderItem extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		console.log(props);
		return (
			<li className='orderItem'>
				<div className='fl'>
					<div className='address'></div>
					<div className='code'></div>
				</div>
				<div className='fr'>
					<div className='btn_fetch'></div>
					<div></div>
				</div>
			</li>
		);
	}
}