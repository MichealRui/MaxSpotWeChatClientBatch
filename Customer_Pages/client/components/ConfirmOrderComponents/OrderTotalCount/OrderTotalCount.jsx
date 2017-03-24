'use strict';

import React from 'react';
require ('./index.css');

export default class OrderTotalCount extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return(
			<div className="orderTotalCount font14">
				共 {props.totalCount} 件商品 合计 {props.totalMoney} 元
			</div>
		);
	}
}

OrderTotalCount.PropTypes = {
	totalCount : React.PropTypes.number,
	totalMoney : React.PropTypes.number
};
OrderTotalCount.PropTypes = {
	totalCount : 0,
	totalMoney : 0
}

