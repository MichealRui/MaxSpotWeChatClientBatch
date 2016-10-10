'use strict';

import React from 'react';
require ('./index.css');

export default class TotalCount extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return(
			<div className="totalCountContainer font14">
				共 {props.totalCount} 件商品 合计 {props.totalMoney} 元
			</div>
		);
	}
}