'use static';

import React from 'react';
import CouponItem from '../../components/CouponItem/CouponItem';
import CouponData from './CouponData';
require('./index.css');

export default class Coupon extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props.orderDetail;
		props = CouponData;
		return (
			<ul className='couponContainer'>
				{
					CouponData.map((coupon, index)=>{
						return <CouponItem key={index} {...coupon} />
					})
				}
			</ul>
		);
	}
}