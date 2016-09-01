'use strict';

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
		orderDetailProductList.forEach(function(item, index){
			itemList.push(<OrderDetailProductItem key={index} productItemDetail={item}/>);
		});
		return(
			<div className ='orderDetailProductListContainer'>
				<ul>
					{itemList}
				</ul>
				<p className='font14'>
					总金额 <span>{this.props.totalMoney}元</span>
				</p>
			</div>
		);
	}
}