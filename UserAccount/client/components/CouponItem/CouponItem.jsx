'use strict';

require('./index.css');
import React from 'react';

export default class CouponItem extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<li className='couponItem'>
				<div className={"amount "+props.styleName}>
					<p className='discountAmount font22'>￥ <span className='font42'>{props.discountAmount}</span></p>
					<p className="limitAmount font14">满<span>{props.limitAmount}</span>可用</p>
				</div>
				<div className='introInfo font12'>
					<p>1.有效期{props.startDate}到{props.endDate}</p>
					<p>2.购买商品时(除特例商品外)，购物券可抵购物券券面显示的现金价值；原则上每张订单只能使用一张购物券，且不得与其他优惠方式同时使用；</p>
				</div>
			</li>
		);
	}
}