'use static';

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
        let productInfoItems = props.orderDetailProductList ? props.orderDetailProductList.map(
            (product, index) =>
                <ProductInfo key={index} product={product}/>
        ) : '';
		return(
			<div className='totalProductsContainer'>
				<OrderDetailTitle orderTitleText={props.orderAddress}/>
				<ul>
					{productInfoItems}
				</ul>
				{ props.discount ? <AccountDisplay name='买减优惠' money={props.discount} />:''}
				<TotalCount totalCount={props.totalCount} totalMoney={props.totalMoney}/>
			</div>
		);
	}
}