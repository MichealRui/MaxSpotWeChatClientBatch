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
		return (
			<div className={"productPrice " + (props.err_status == 1 || editStatus == 'false' ? '' : 'hideactive') + (props.err_status == 1 ? ' color_000' : '')}>
				<span className='price font14'>{props.sellprice / 100}<span className="font10"> 元</span></span>
				<span className={'icon font10 ' + (props.err_status == 3 ? 'active' : '') }>X</span>
				<span className={'count font10 ' + (props.err_status == 3 ? 'active' : '')}>{props.count}</span>
				<p className={"productTips font10 " + (props.err_status == 0 ? 'hide' : '')}>{props.err_msg}</p>
			</div>
		)
	}
}