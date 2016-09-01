'use static';

import React from 'react';
import CustomerOrder from '../../components/CustomerOrder/CustomerOrder';
require('./index.css');
export default class CustomerOrderList extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let listArr = [];
		this.props.orderList.forEach(function(order){
			listArr.push(<CustomerOrder order={order} />);
		});
		return(
			<ul className='customerOrderContainer'>
				{listArr}
			</ul>
		);
	}
}