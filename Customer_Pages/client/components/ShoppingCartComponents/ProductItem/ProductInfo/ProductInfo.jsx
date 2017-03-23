'use strict';

/*require('./index.css');*/

import React from 'react';
import util from '../../../../util/WeChatUtil';
require('./index.css');
export default class ProductInfo extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const props = this.props.data;
		let defaultImg = DEFALUT_INFO.defaultImg;
		let domain = ENV.domain;
		domain = "http://114.215.143.97";
		return (
			<div className="ShoppcartProductInfo">
				<div className="productImg">
					{
						props.imagePath ?
							<img src={domain + util.getMiddlePic(props.imagePath)}/>
							:
							<img src={defaultImg}/>
					}
					{
						this.props.isGift ?
							<span className={"giftBanner font12 "+ (this.props.activate ? "activate":"fail")}>赠品</span> : null
					}

				</div>
				<div className="wrapper">
					<p className='productName font14'>{props.brandName} {props.name} </p>
				</div>
			</div>
		)
	}
}