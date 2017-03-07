'use strict';
import React from 'react';
require('./index.css');
export default class ProductInfo extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const props = this.props.data;
		return (
			<div className="productInfo">
				<div className="productImg">
					<img src={props.imagePath}/>
					{
						this.props.isGift ?
							<span className={"giftBanner font12 "+ (this.props.activate ? 'activate':'fail')}>赠品</span>:null
					}

				</div>
				<div className="wrapper">
					<p className='productName font14'>{props.brandName} {props.name} </p>
				</div>
			</div>
		)
	}
}