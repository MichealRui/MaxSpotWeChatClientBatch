'use static';

import React from 'react';
import OrderDetailProductItem from '../../components/OrderDetailProductItem/OrderDetailProductItem';
require('./index.css');

export default class OrderDetailProductList extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let itemList = [];
		let orderDetailProductList = this.props.orderDetailProductList;
		orderDetailProductList.forEach(function(item){
			itemList.push(<OrderDetailProductItem productItemDetail={item}/>);
		});
		return(
			<div className ='orderDetailProductListContainer'>
				<ul>
					{itemList}
				</ul>
				<p>
					总金额 ￥60
				</p>
			</div>
		);
	}
}