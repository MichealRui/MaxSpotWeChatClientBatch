'use strict';
import React from 'react'
import { connect }  from 'react-redux';
import Header from '../../components/Header/Header'
import ShoppingCartContainer from '../ShoppingCartContainer/ShoppingCartContainer'
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
import {initActivity,initChannelActivity} from '../../actions/index';
import CartStatus from '../CartContainer/CartStatus';

class PageContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cartVisible:false,
            skuVisible:false,
            paySuccVisible:false,
            fetchSkuVisible:false
        };
        this.maxIdleTime = 1200; // 5 minute
        this.idleTime = 0;
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(initMainContent());
        // this.listenIdleTime.bind(this)();
    }

    listenIdleTime() {
        if(this.idleTime < this.maxIdleTime) {
            this.idleTime = this.idleTime + 1;
            console.log(this.idleTime);
            window.setTimeout(
                () => this.listenIdleTime() , 1000
            )
        } else {
            const { dispatch } = this.props;
            dispatch(initMainContent());
            this.idleTime = 0;
            this.listenIdleTime.bind(this)();
        }
    }

    onCartBtnClick() {
        console.log("cartClick")
        const {dispatch} = this.props;
        // dispatch(setCartStatus(CartStatus.SHOW_QR));
        // dispatch(fetchCart());
        dispatch(submitCart());
        this.setState({
            cartVisible: true,
            // skuVisible: false
        })
    }

    hideCart() {
        const {dispatch} = this.props;
        dispatch(clearQr());
        dispatch(setCartStatus(CartStatus.HIDE_CART));
        dispatch(clearCart());
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
            <div className="pageContainer" onClick={() => this.idleTime = 0}
                 onTouchStart={() => this.idleTime = 0}
            >
                <Header fetchSkuClick={()=>this.onFetchSkuBtnClick.bind(this)} />
                <ShoppingCartContainer
                    {...state.cart}
                    decItem={(item) => dispatch(deleteOneFromCart(item))}
                    addToCart={(item) => dispatch(addToCart(item))}
                    removeItem={(item) => dispatch(removeFromCart(item))}
                    clearCart={() => dispatch(clearCart())}
                    cartClick={this.onCartBtnClick.bind(this)}
                />
                <SubContent
                    bannerData={state.banner}
                    activityData={state.activity}
                    contentData={state.currentSub}
                    changeContent={(key, subKey) => dispatch(changeSubContent(key, subKey))}
                    channelData={state.channel}
                    addToCart={(item) => dispatch(addToCart(item))}
                    showProduct={(item) => this.onProductDetailClick.bind(this)(item)}
                    selector = {state.selector}
                    currentSelector={state.currentSelector}
                    getActivityData={(campaignId)=>dispatch(initActivity(campaignId))}
                    getChannelData={(type)=>dispatch(initChannelActivity(type))}
                    isActivity={state.isActivity}
                    activeTag={state.activeTag}
                />

                <CartContainer visible={this.state.cartVisible}
                               onCancel={ () => this.hideCart.bind(this) }
                               {...state.cart}
                               setCart={(status) => dispatch(setCartStatus(status))}
                               qr={state.qrCode}
                               order={state.order}
                               fetchOrder={(or) => dispatch(fetchOrderStatus(or))}
                               clearCart={() => dispatch(clearCart())}
                />
                <SkuContainer visible={this.state.skuVisible}
                              onCancel={()=>this.hideProductDetail.bind(this)}
                              product={state.product}
                              decItem={(item) => dispatch(deleteOneFromCart(item))}
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
    return Object.assign({}, {state: store})
}

module.exports = connect(select)(PageContainer);