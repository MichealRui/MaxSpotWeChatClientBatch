'use static';

import React from 'react';
require('./index.css');

export default class OrderProductItemList extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let productItemList = this.props.productItemList;
		let orderProductItemList = [];
		productItemList.forEach(function(item){
			orderProductItemList.push(<li><img src={item} /></li>);
		});
		return(
			<div className='orderProductItemList'>
				<ul>
					{orderProductItemList}
				</ul>
				<span className='fa fa-angle-right orderDetailArrow font28'>
				</span>
			</div>
		);
	}
}