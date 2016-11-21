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
import Util from '../../util/WeChatUtil'
require('./index.css');

class ProductDetail extends React.Component {
	constructor(props){
		super(props);
	}

	componentWillMount(){
	    const {actions} = this.props;
        let param = Util.getUrlParam();
        let storeId = param.storeid;
        let skuNumber = param.skunumber;
        actions.initProductDetail(skuNumber, storeId);
    }

	render(){
		let {detail, actions} = this.props;
		let {productDetail, brand} = detail;
        let param = Util.getUrlParam();
        let storeId = param.storeid;
		return(
			<div className='productDetailContainer'>
				<div className='area'></div>
				<ProductDetailTitle
                    productStore={productDetail.brandName}
                    productName={productDetail.name}
                    productInfo={productDetail.productInfo}
                />
				<ProductSlider productImgs={productDetail.images}/>
				<AddIntoCart
                    productCost={productDetail.sellprice / 100}
                    productCount={productDetail.quantity}
                    addIntoCartClick={
                        ()=>{actions.addIntoCart(
                            {
                                skuId: productDetail.id + '',
                                storeId: storeId + '',
                                count: '1'
                            }
                        )}}
                />
				<p className='storeInfo font12'>{brand.description}</p>
				<div className='storeIntroWrap'>
					<StoreIntro brand = {brand}
                                storeId = {storeId}
                    />
				</div>
				{/*<ProductComment productComment={productDetail.productComment}/>*/}
			</div>
		);
	}
}

function mapStateToProps(state){
    return {
        detail:state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions:bindActionCreators(Actions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);