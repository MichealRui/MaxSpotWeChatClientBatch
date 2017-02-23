'use strict';

import React from 'react';
import ProductInfo from '../../CommoonComponents/OrderProductInfo/OrderProductInfo'
require('./index.css');

export default class OrderDetailProductList extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let itemList = [];
		let props = this.props;
		let orderDetailProductList = props.orderInfo.skus;
		if(orderDetailProductList && orderDetailProductList.length > 0) {
			orderDetailProductList.forEach(function(item, index){
				item.showPrice = true;
				itemList.push(<ProductInfo key={index} product={item}/>);
			});
		}
		return(
			<div className ='orderDetailProductListContainer'>
				<ul>
					{itemList}
				</ul>
				<p className='font14'>
					总金额 <span>{props.orderInfo.totalPrice / 100 || 0}元</span>
				</p>
			</div>
		);
	}
}

OrderDetailProductList.PropTypes = {
	orderInfo : React.PropTypes.object
};
OrderDetailProductList.defaultProps = {
	orderInfo : {
		skus : [],
		totalPrice : 0
	}
}