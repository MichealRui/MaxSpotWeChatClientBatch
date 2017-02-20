'use strict';

/*require('./index.css');*/

import React from 'react';
require('./index.css');
export default class ProductPrice extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const props = this.props.data;
		const editStatus = this.props.editStatus;
		const PRODUCT_OUT_SELL= 1; //下架
		const PRODUCT_EMPTY_SELL= 2; //售罄
		const PRODUCT_ON_SELL = 1 ; //在售
		const PRODUCT_LOW_STOCK = 3 //库存不足
		return (
			<div className={"productPrice " + (props.err_status == PRODUCT_OUT_SELL || props.err_status == PRODUCT_EMPTY_SELL || editStatus == 'false' ? '' : 'hideactive') + (props.err_status == PRODUCT_OUT_SELL || props.err_status == PRODUCT_EMPTY_SELL ? ' color_000' : '')}>
				<span className='price font16'>{props.sellprice / 100}<span className="font10"> 元</span></span>
				<span className={'icon font12 ' + (props.err_status == 3 ? 'active' : '') }>X</span>
				<span className={'count font12 ' + (props.err_status == 3 ? 'active' : '')}>{props.count}</span>
				<p className={"productTips font12 " + (props.err_status == 0 ? 'hide' : '')}>{props.err_msg}</p>
			</div>
		)
	}
}