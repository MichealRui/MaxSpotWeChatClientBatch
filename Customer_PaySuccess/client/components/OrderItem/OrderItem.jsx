'use strict';

require('./index.css');
import React from 'react';

export default class OrderItem extends React.Component {
	constructor(props){
		super(props);
	}

	onTakeClick() {
	    window.location.href = ''
    }

	render(){
		let props = this.props;
		return (
			<li className='orderItem clearfix'>
				<div className='fl orderInfo'>
					<div className='address font14'>{props.machineAddress}</div>
					<div className='code font14 blue'>取货码：{props.takeGoodsNumber}</div>
				</div>
				<div className='fr orderAction'>
					<div className='fl btn_fetch font14' onClick={() => this.onTakeClick()}>立即取货</div>
					<div className="fr font20"> > </div>
				</div>
			</li>
		);
	}
}