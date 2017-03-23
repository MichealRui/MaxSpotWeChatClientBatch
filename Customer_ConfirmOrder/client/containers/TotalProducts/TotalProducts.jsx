'use strict';

import React from 'react';
import OrderDetailTitle from '../../components/OrderDetailTitle/OrderDetailTitle';
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import OrderDescription from '../../components/OrderDescription/OrderDescription'
require('./index.css');

export default class TotalProducts extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let { productItem, store, promotions } = this.props;
        let productInfoItems = productItem.skus ? productItem.skus.map(
            (product, index) =>
                <ProductInfo key={index} product={product}/>
        ) : '';
        let count = productItem.skus.map(s => s.count).reduce((pre, next) => pre + next, 0);
		let tags = promotions.map ( promotion => {
			if(promotion.deductMoney ) {
				return promotion.campaign.campaignTag + '  -'+promotion.deductMoney / 100 +  ' 元';
			}
		}).filter(t => t);
		let sum = count  + '件商品 合计' + productItem.originalPrice / 100 + '元';
		tags.unshift(sum);

		return(
			<div className='totalProductsContainer'>
				<OrderDetailTitle orderTitleText={store.address}/>
				<ul>
					{productInfoItems}
				</ul>
				<OrderDescription contents={tags}/>
				<OrderDescription important={true} contents={
					new Array('应付金额 ' + ( productItem.totalPrice / 100 || 0 ) + ' 元')
				}/>
				<div className="takeSpace"></div>
			</div>
		);
	}
}