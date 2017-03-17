'use strict';

import React from 'react';
import util from '../../../util/WeChatUtil'
require('./index.css');

export default class OrderProductItemList extends React.Component {
	constructor(props){
		super(props);
	}


	render(){
		let productItemList = this.props.productItemList;
		let defaultImg = DEFALUT_INFO.defaultImg;
		// let domain = ENV.domain;
		let domain = "http://114.215.143.97";
		let orderProductItemList = [];
		productItemList.forEach(function(item, index){
			let imginfo = item.sku.imagePath ? <li key={index}><img src={domain + util.getMiddlePic(item.sku.imagePath)} /></li>
				:<li key={index}><img src={defaultImg} /></li>;
			orderProductItemList.push(imginfo);
		});
		return(
			<div className='orderProductItemList'>
				<ul>
					{orderProductItemList}
				</ul>
				<span className='fa fa-angle-right orderDetailArrow font28'>
				</span>
			</div>
		);
	}
}

OrderProductItemList.PropTypes = {
	productItemList : React.PropTypes.array
}
OrderProductItemList.defaultProps = {
	productItemList : [
		{
			sku : {
				imagePath : ''
			}
		}
	]
}