'use strict';

require('./index.css');
import React from 'react';

export default class OrderItem extends React.Component {
	constructor(props){
		super(props);
	}

	onTakeClick() {
	    window.location.href =
			ENV.domain + '/buyer_takegoods/index.html?ordernumber=' + this.props.orderNumber
    }

	render(){
		let props = this.props;
        console.log(props);
		return (
			<li className='orderItem clearfix'>
				<div className='fl orderInfo'>
					<div className='address font14'>{props.store.name}</div>
					<div className='code font12 darkGray'>订单号：{props.orderNumber}</div>
				</div>
				<div className='fr orderAction'>
					<div className='fl btn_fetch font14 white' onClick={this.onTakeClick.bind(this)}>立即取货</div>
				</div>
			</li>
		);
	}
}