'use strict';
import React from 'react';
import { connect }  from 'react-redux';
import Header from '../../components/active_Header/Header';
import Banner from '../../components/active_Banner/Banner';
import SubContent from '../active_SubContent/SubContent';
import CartContainer from '../CartContainer/CartContainer';
import SkuContainer from '../SkuContainer/SkuContainer';
import { initMainContent, initActivity } from '../../actions/index'
import { addToCart, deleteOneFromCart, removeFromCart } from '../../actions/index';
import {changeSubContent} from '../../actions/index';
import {submitCart, clearQr, fetchOrderStatus, setCartStatus, clearCart, fetchCart,fetchSku} from '../../actions/index'
import CartStatus from '../CartContainer/CartStatus';
class Active extends React.Component{
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
        dispatch(initActivity())
    }

    onCartBtnClick() {
        const {dispatch} = this.props;
        dispatch(setCartStatus(CartStatus.SHOW_CART));
        dispatch(fetchCart());
        this.setState({
            cartVisible: true,
            skuVisible:false
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
    goBack(){
        const {dispatch} = this.props;
        dispatch(clearQr());
        dispatch(setCartStatus(CartStatus.HIDE_CART));
        this.setState({
            cartVisible: false
        });
        this.context.router.push('/');
    }

    onProductDetailClick(item){
        let {dispatch} = this.props;
        dispatch(fetchSku(item.skuNumber));
        this.setState({
            skuVisible:true
        })
    }

    hideProductDetail(){
        this.setState({
            skuVisible:false
        })
    }

    render() {
        let {state, dispatch} = this.props;
        return (
            <div className="pageContainer" id="pageContainer">
                <Header cartClick={() => this.onCartBtnClick.bind(this)}
                        fetchSkuClick={()=>this.onFetchSkuBtnClick.bind(this)}
                        {...state.cart}
                />
                <Banner bannerData={state.activity.banner}/>
                <SubContent
                    contentData={state.activity}
                    changeContent={(key, subKey) => dispatch(changeSubContent(key, subKey))}
                    addToCart={(item) => dispatch(addToCart(item))}
                    showProduct={(item) => this.onProductDetailClick.bind(this)(item)}
                    selector = {state.selector}
                    style={{backgroundColor:'#fff'}}
                />
                <CartContainer visible={this.state.cartVisible}
                               onCancel={ () => this.hideCart.bind(this) }
                               goBack={ () => this.goBack.bind(this) }
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
                              cartClick={() => this.onCartBtnClick.bind(this)}
                              {...state.cart}
                />
            </div>
        )
    }
}

Active.contextTypes = {
    router: React.PropTypes.object
};

function select(store) {
    console.log('dispatched');
    return Object.assign({}, {state: store})
}

export default connect(select)(Active)