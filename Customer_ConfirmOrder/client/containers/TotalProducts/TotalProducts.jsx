'use strict';

import React from 'react';
import OrderDetailTitle from '../../components/OrderDetailTitle/OrderDetailTitle';
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import TotalCount from '../../components/TotalCount/TotalCount';
import AccountDisplay from '../../components/AccountDisplay/AccountDisplay';
require('./index.css');

export default class TotalProducts extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props.productItem;
        let productInfoItems = props.skus ? props.skus.map(
            (product, index) =>
                <ProductInfo key={index} product={product}/>
        ) : '';
        let count = props.skus.map(s => s.count).reduce((pre, next) => pre + next, 0);
		return(
			<div className='totalProductsContainer'>
				<OrderDetailTitle orderTitleText={props.orderAddress}/>
				<ul>
					{productInfoItems}
				</ul>
				{ props.discount ? <AccountDisplay name='买减优惠' money={props.discount} />:''}
				<TotalCount totalCount={count} totalMoney={props.totalPrice/100 || 0}/>
			</div>
		);
	}
}