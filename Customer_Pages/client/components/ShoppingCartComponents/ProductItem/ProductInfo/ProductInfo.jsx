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
			<div className="productInfo">
				<div className="productImg">
					{
						props.imagePath ?
							<img src={domain + util.getMiddlePic(props.imagePath)}/>
							:
							<img src={defaultImg}/>
					}

				</div>
				<div className="wrapper">
					<p className='productName font14'>{props.brandName} {props.name} </p>
				</div>
			</div>
		)
	}
}