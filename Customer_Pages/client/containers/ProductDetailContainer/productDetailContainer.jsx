"use strict";
import React from 'react';
import { connect } from 'react-redux';
import Message from '../../components/CommoonComponents/Message/Message';
import { setMessage } from '../../actions/Message';
import { initProductDetail } from '../../actions/ProductDetail'
import ProductDetailTitle from '../../components/ProductDetailComponents/ProductDetailTitle/ProductDetailTitle';
import ProductSlider from '../../components/ProductDetailComponents/ProductSlider/ProductSlider';
import AddIntoCart from '../../components/ProductDetailComponents/AddIntoCart/AddIntoCart';
import ButtonBottom from '../../components/HomeComponents/Cart/Cart'
import StoreIntro from '../../components/ProductDetailComponents/StoreIntro/StoreIntro'
import { addToCart } from '../../actions/Cart';
require('./index.css');
class ProductDetailContainer extends React.Component {
    constructor(props){
        super (props);
        this._storeId = this.props.params.storeid;
        this._skuNum = this.props.params.skuNumber;
    }
    componentWillMount(){
        const { dispatch } = this.props;
        dispatch(initProductDetail(this._skuNum,this._storeId))
    }

    render(){
        let {state,dispatch} = this.props;
        let { cart, productDetail, message} = state;

        return (
            <div className="productDetailContainer">
                <Message msgContent={message}
                         clearMessage={() => dispatch(setMessage({errorMessage: ""}))}
                />
                <div className='area'></div>
                <ProductDetailTitle
                    titleData = {productDetail.product}
                />
                <ProductSlider sliderData={productDetail.product}/>
                <AddIntoCart
                    productData={productDetail.product}
                    storeId = {productDetail.storeId}
                    addToCart={(item) => dispatch(addToCart(item))}
                />
                <StoreIntro
                    productData = {productDetail.product}
                    brandData = {productDetail.brand}
                    storeId = {productDetail.storeId}
                />
                <ButtonBottom cart={cart.cart}/>
            </div>
        )
    }
}
function select(store) {
    return Object.assign({}, {state: store})
}
export default connect(select)(ProductDetailContainer)