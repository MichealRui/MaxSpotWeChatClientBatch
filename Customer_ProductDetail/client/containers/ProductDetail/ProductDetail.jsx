'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/index';
import Button from '../../components/Button/Button';
import ProductDetailTitle from '../../components/ProductDetailTitle/ProductDetailTitle';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import AddIntoCart from '../../components/AddIntoCart/AddIntoCart';
import StoreIntro from '../../components/StoreIntro/StoreIntro';
import ProductComment from '../../components/ProductComment/ProductComment';
import ProductDetailData from './ProductDetailData';
require('./index.css');

class ProductDetail extends React.Component {
	constructor(props){
		super(props);
	}

	componentWillMount(){
	    const {actions} = this.props;
        actions.initProductDetail(window.product_id);
    }

	render(){
		let {productDetail, actions} = this.props;
        let product_id = window.product_id;
		return(
			<div className='productDetailContainer'>
				<div className='area'></div>
				<ProductDetailTitle productStore={productDetail.productStore} productName={productDetail.productName} productInfo={productDetail.productInfo}/>
				<ProductSlider productImgs={productDetail.productImgs}/>
				<AddIntoCart productCost={productDetail.productCost} productCount={productDetail.productCount} addIntoCartClick={()=>{actions.addIntoCart(product_id)}}/>
				<p className='storeInfo font12'>{ProductDetailData.storeInfo}</p>
				<div className='storeIntroWrap'>
					<StoreIntro storeImg={productDetail.storeImg} storeName={productDetail.storeName} storeIntro={productDetail.storeIntro}/>
				</div>
				<ProductComment productComment={productDetail.productComment}/>
			</div>
		);
	}
}

function mapStateToProps(state){
    return {
        productDetail:state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(Actions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);