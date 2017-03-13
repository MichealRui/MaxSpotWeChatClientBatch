'use strict';

import React from 'react';
import OrderDetailProductItem from '../../components/OrderDetailProductItem/OrderDetailProductItem';
import AccountDisplay from '../../components/AccountDisplay/AccountDisplay'
require('./index.css');

export default class OrderDetailProductList extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let itemList = [];
		let orderDetailProductList = this.props.orderDetailProductList;
		if(orderDetailProductList && orderDetailProductList.length > 0) {
			orderDetailProductList.forEach(function(item, index){
				itemList.push(<OrderDetailProductItem key={index} productItemDetail={item}/>);
			});
		}
		let tags = this.props.campaigns.map ( campaign => {
			if(campaign.deductMoney ) {
				return <p className="content font14">
					{ campaign.campaign.campaignTag + '  -'+campaign.deductMoney / 100 +  ' 元' }
					</p>
			}
		});
		return(
			<div className ='orderDetailProductListContainer'>
				<ul>
					{itemList}
				</ul>
				<div className="context font14">
					{tags}
				</div>
				<div className="totalArea">
					<AccountDisplay name='商品总金额' money={this.props.originalPrice / 100}/>
					<AccountDisplay name='商品优惠总计' money={(this.props.originalPrice - this.props.totalPrice)/100}/>
				</div>
				<p className='font14'>
					总金额 <span>{this.props.totalMoney / 100 || 0}元</span>
				</p>
			</div>
		);
	}
}