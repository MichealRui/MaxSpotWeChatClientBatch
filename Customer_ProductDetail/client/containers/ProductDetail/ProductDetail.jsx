'use strict';

import React from 'react';
import Button from '../../components/Button/Button';
import ProductDetailTitle from '../../components/ProductDetailTitle/ProductDetailTitle';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import AddIntoCart from '../../components/AddIntoCart/AddIntoCart';
import StoreIntro from '../../components/StoreIntro/StoreIntro';
import ProductComment from '../../components/ProductComment/ProductComment';
import ProductDetailData from './ProductDetailData';
require('./index.css');

export default class ProductDetail extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props.orderDetail;
		props = ProductDetailData;
		return(
			<div className='productDetailContainer'>
				<div className='area'></div>
				<ProductDetailTitle productStore={props.productStore} productName={props.productName} productInfo={props.productInfo}/>
				<ProductSlider productImgs={props.productImgs}/>
				<AddIntoCart productCost={props.productCost} productCount={props.productCount}/>
				<p className='storeInfo font12'>{ProductDetailData.storeInfo}</p>
				<div className='storeIntroWrap'>
					<StoreIntro storeImg={props.storeImg} storeName={props.storeName} storeIntro={props.storeIntro}/>
				</div>
				<ProductComment productComment={props.productComment}/>
			</div>
		);
	}
}