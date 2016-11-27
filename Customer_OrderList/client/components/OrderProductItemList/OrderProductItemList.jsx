'use strict';

import React from 'react';
require('./index.css');

export default class OrderProductItemList extends React.Component {
	constructor(props){
		super(props);
	}

	getMiddlePic(path) {
		let particial = path.split('.');
		if(particial.length == 2) {
			particial[0] = particial[0] + '_middle'
			return particial.join('.')
		} else {
			path
		}
	}

	render(){
		let productItemList = this.props.productItemList;
		let orderProductItemList = [];
		productItemList.forEach(function(item, index){
			orderProductItemList.push(<li key={item.id}><img src={this.getMiddlePic(item.sku.imagePath)} /></li>);
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