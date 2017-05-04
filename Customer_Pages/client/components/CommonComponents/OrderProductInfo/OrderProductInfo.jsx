'use strict';

import React from 'react';
import AccountDisplay from '..//AccountDisplay/AccountDisplay'
import util from '../../../util/WeChatUtil'
require ('./index.css');

export default class OrderProductInfo extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		let sku = props.product.sku;
		let defaultImg = DEFALUT_INFO.defaultImg;
		// let domain = ENV.domain;
		let domain = "http://114.215.143.97";
		return(
			<li className='orderProductInfo'>
				<div className='productInfo'>
					<div className="productImg">
						{
							sku.imagePath ?
								<img src={domain + util.getMiddlePic(sku.imagePath)} className='productImg' />
								:
								<img src={defaultImg} className='productImg' />
						}
						{
							sku.isPresent ?
								<span className={"giftBanner font12 activate"}>赠品</span> : null
						}
					</div>


					<span className='orderProductContainer'>
						<p className='productName font12'>{sku.brandName}</p>
						<p className='productDesc font14'>{sku.shortName}</p>
						<p className='productTaste font10'>{sku.categoryName}</p>
					</span>
					<span className='quantity font14'><i>x</i>{props.product.count}</span>
					<span className='unitPrice font14'>{props.product.sellPrice / 100}元</span>
				</div>
				{
					props.product.showPrice ? (
						<div className="totalArea">
							<AccountDisplay name='商品总金额' money={props.product.count * props.product.sellPrice /100}/>
						</div>
					):''
				}

			</li>
		);
	}
}

OrderProductInfo.PropTypes = {
	product : React.PropTypes.object
}
OrderProductInfo.defaultProps = {
	product : {
		sku : {
			imagePath:'',
			brandName : '',
			shortName : '',
			categoryName : ''
		},
		count : 0,
		sellPrice : 0,
		showPrice : false
	}
}