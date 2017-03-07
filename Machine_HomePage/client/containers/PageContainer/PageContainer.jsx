'use strict';
import React from 'react'
import { connect }  from 'react-redux';
import Header from '../../components/Header/Header'
import Banner from '../../components/Banner/Banner'
import SubContent from '../../containers/SubContent/SubContent'
import CartContainer from '../../containers/CartContainer/CartContainer';
import SkuContainer from '../../containers/SkuContainer/SkuContainer';
import FetchSkuContainer from '../../containers/FetchSkuContainer/FetchSkuContainer';
import { initMainContent } from '../../actions/index'
import { addToCart, deleteOneFromCart, removeFromCart } from '../../actions/index'
import {changeSubContent} from '../../actions/index'
import {fetchSku} from '../../actions/index'
import {fetchCart} from '../../actions/index'
import {submitCart, clearQr, fetchOrderStatus, setCartStatus, clearCart} from '../../actions/index'
import CartStatus from '../CartContainer/CartStatus';

class PageContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cartVisible:false,
            skuVisible:false,
            paySuccVisible:false,
            fetchSkuVisible:false
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(initMainContent());
    }

    onCartBtnClick() {
        const {dispatch} = this.props;
        dispatch(setCartStatus(CartStatus.SHOW_CART));
        dispatch(fetchCart());
        this.setState({
            cartVisible: true,
            skuVisible: false
        })
    }

    hideCart() {
        const {dispatch} = this.props;
        dispatch(clearQr());
        dispatch(setCartStatus(CartStatus.HIDE_CART));
        this.setState({
            cartVisible: false
        });
    }

    onFetchSkuBtnClick() {
        this.setState({
            fetchSkuVisible: true
        })
    }

    hideFetchSku() {
        this.setState({
            fetchSkuVisible: false
        });
    }

    onProductDetailClick(item){
        let {dispatch} = this.props;
        dispatch(fetchSku(item.skuNumber));
        this.setState({
            skuVisible:true,
        });
    }

    hideProductDetail(){
        this.setState({
            skuVisible:false,
        })
    }

    render() {
        let {state, dispatch} = this.props;
        return (
            <div className="pageContainer">
                <Header cartClick={() => this.onCartBtnClick.bind(this)}
                        fetchSkuClick={()=>this.onFetchSkuBtnClick.bind(this)}
                        {...state.cart}
                />
                <Banner bannerData={[]}/>
                <SubContent
                    contentData={state.currentSub}
                    changeContent={(key, subKey) => dispatch(changeSubContent(key, subKey))}
                    addToCart={(item) => dispatch(addToCart(item))}
                    showProduct={(item) => this.onProductDetailClick.bind(this)(item)}
                    selector = {state.selector}
                    currentSelector={state.currentSelector}
                />
                <CartContainer visible={this.state.cartVisible}
                               onCancel={ () => this.hideCart.bind(this) }
                               {...state.cart}
                               addToCart={(item) => dispatch(addToCart(item))}
                               decItem={(item) => dispatch(deleteOneFromCart(item))}
                               removeItem={(item) => dispatch(removeFromCart(item))}
                               submit={() => dispatch(submitCart())}
                               setCart={(status) => dispatch(setCartStatus(status))}
                               qr={state.qrCode}
                               order={state.order}
                               fetchOrder={(or) => dispatch(fetchOrderStatus(or))}
                               clearCart={() => dispatch(clearCart())}
                />
                <SkuContainer visible={this.state.skuVisible}
                              onCancel={()=>this.hideProductDetail.bind(this)}
                              product={state.product}
                              addToCart={(item) => dispatch(addToCart(item))}
                              {...state.cart}
                              onCartClick = {()=>this.onCartBtnClick.bind(this)}
                />
                <FetchSkuContainer visible={this.state.fetchSkuVisible}
                                   onCancel={this.hideFetchSku.bind(this)}
                />
            </div>
        )
    }
}

function select(store) {
    console.log('dispatched');
    return Object.assign({}, {state: store})
}

module.exports = connect(select)(PageContainer)