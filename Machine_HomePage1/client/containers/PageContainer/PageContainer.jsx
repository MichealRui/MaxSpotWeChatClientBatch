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
import {submitCart, clearQr, fetchOrderStatus, setCartStatus, clearCart ,setQrCount , addQrCount} from '../../actions/index'
import {initActivity,initChannelActivity} from '../../actions/index';
import CartStatus from '../CartContainer/CartStatus';
import RemindContainer from '../RemindContainer/RemindContainer'

class PageContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cartVisible:false,
            skuVisible:false,
            paySuccVisible:false,
            fetchSkuVisible:false,
            remindVisible:false,
            beginBack : true,
        };
        this.maxIdleTime = 1200; // 5 minute
        this.idleTime = 0;
        this.timer = null;
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(initMainContent());
        // this.listenIdleTime.bind(this)();
    }

    componentDidMount(){
        //购物车有商品，并且长时间没有动作
        // this.listenIdleTime.bind(this)();
    }

    listenIdleTime() {
        if(this.idleTime < this.maxIdleTime) {
            this.idleTime = this.idleTime + 1;
            this.timer = window.setTimeout(
                () => this.listenIdleTime() , 1000
            )
        } else {
            this.onRemindBtnClick();
            // const { dispatch } = this.props;
            // dispatch(initMainContent());
            // this.idleTime = 0;
            // this.listenIdleTime.bind(this)();
        }
    }

    onCartBtnClick() {
        const {dispatch} = this.props;
        // dispatch(setCartStatus(CartStatus.SHOW_QR));
        // dispatch(fetchCart());
        dispatch(submitCart());
        this.setState({
            cartVisible: true,
            // skuVisible: false
        });
        window.clearTimeout(this.timer);
    }

    onRemindBtnClick(){
        this.setState({
            remindVisible:true,
            beginBack : false,
        });
        window.clearTimeout(this.timer);
    }

    hideRemind(){
        this.setState({
            remindVisible:false,
            beginBack : true,
        });
        this.countBack(this.props);
    }

    hideCart() {
        const {dispatch} = this.props;
        dispatch(clearQr());
        dispatch(setCartStatus(CartStatus.HIDE_CART));
        dispatch(clearCart());
        this.setState({
            cartVisible: false
        });
        this.countBack(this.props);

    }

    onFetchSkuBtnClick() {
        this.setState({
            fetchSkuVisible: true
        });
        window.clearTimeout(this.timer);
    }

    hideFetchSku() {
        this.setState({
            fetchSkuVisible: false
        });
        this.countBack(this.props);
    }

    onProductDetailClick(item){
        let {dispatch} = this.props;
        dispatch(fetchSku(item.skuNumber));
        this.setState({
            skuVisible:true,
        });
        window.clearTimeout(this.timer);
    }

    hideProductDetail(){
        this.setState({
            skuVisible:false,
        });
        this.countBack(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.countBack(nextProps)
        if(this.state.cartVisible){
            window.clearTimeout(this.timer);
        }
    }

    countBack(propss){
        window.clearTimeout(this.timer);
        this.idleTime = 0;
        if(propss.state.cart.count){
            this.listenIdleTime.bind(this)();
        }

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
                    remindShow={this.onRemindBtnClick.bind(this)}
                    beginBack={this.state.beginBack}
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
                               setQrCount={(count)=>dispatch(setQrCount(count))}
                               qrCount={state.qrCount}
                               addQrCount={()=>dispatch(addQrCount())}
                               remindShow={()=>this.onRemindBtnClick.bind(this)}
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
                <RemindContainer visible={this.state.remindVisible}
                                 onCancel={this.hideRemind.bind(this)}
                                 cartVisible={this.state.cartVisible}
                />

            </div>
        )
    }
}

function select(store) {
    return Object.assign({}, {state: store})
}

module.exports = connect(select)(PageContainer);