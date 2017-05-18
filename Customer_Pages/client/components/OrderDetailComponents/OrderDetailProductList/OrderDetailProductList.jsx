'use strict';

import React from 'react';
import ProductInfo from '../../CommonComponents/OrderProductInfo/OrderProductInfo'
import AccountDisplay from '../../CommonComponents/AccountDisplay/AccountDisplay'
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
		let campaigns = props.orderInfo.promotions;
		let tags = campaigns.map(
			(cam,index) => {
				if(cam.deductMoney){
					return <p key={index} className="content font14">
						<span>{ cam.campaign.campaignTag}</span> {' -'+cam.deductMoney / 100 +  ' 元' }
					</p>
				}
			}
		);

		return(
			<div className ='orderDetailProductListContainer'>
				<ul>
					{itemList}
				</ul>
				<div className="contexts font14">
					{tags}
				</div>
				<div className="totalArea">
					<AccountDisplay name='商品总金额' money={props.orderInfo.originalPrice / 100}/>
					<AccountDisplay name='商品优惠总计' money={(props.orderInfo.originalPrice - props.orderInfo.totalPrice)/100}/>
				</div>
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
		totalPrice : 0,
		promotions : [],
		originalPrice : 0
	}
}