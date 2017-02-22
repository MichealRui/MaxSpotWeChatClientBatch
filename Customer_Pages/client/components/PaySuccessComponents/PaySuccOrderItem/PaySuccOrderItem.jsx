'use strict';

require('./index.css');
import React from 'react';

export default class PaySuccOrderItem extends React.Component {
	constructor(props){
		super(props);
	}

	onTakeClick() {
	    window.location.href =
			ENV.domain + '/buyer_takegoods/index.html?ordernumber=' + this.props.orderInfo.orderNumber
    }

	render(){
		let props = this.props;
		return (
			<li className='PaySuccOrderItem clearfix'>
				<div className='fl orderInfo'>
					<div className='address font14'>{props.orderInfo.store.name}</div>
					<div className='code font14 blue'>订单号：{props.orderInfo.orderNumber}</div>
				</div>
				<div className='fr orderAction'>
					<div className='fl btn_fetch font14' onClick={this.onTakeClick.bind(this)}>立即取货</div>
					<div className="fr font20"> > </div>
				</div>
			</li>
		);
	}
}

PaySuccOrderItem.PropTypes = {
	orderInfo : React.PropTypes.object
};
PaySuccOrderItem.defaultProps = {
	orderInfo : {
		orderNumber : '',
		store : {
			name : ''
		}
	}
}