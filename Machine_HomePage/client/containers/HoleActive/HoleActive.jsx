"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {fetchCart,setCartStatus,clearQr} from '../../actions/index';
import {addToCart,deleteOneFromCart,removeFromCart,submitCart,fetchOrderStatus,clearCart} from '../../actions/index';
import Header from '../../components/active_Header/Header';
import CartStatus from '../CartContainer/CartStatus';
import CartContainer from '../CartContainer/CartContainer';
require('./index.css');

class HoleActive extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cartVisible:false,
        }
    }

    componentWillMount(){
        let {dispatch} = this.props;
        dispatch(fetchCart());
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
    onFetchSkuBtnClick() {

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
    render(){
        let {state, dispatch} = this.props;
        return (
            <div className="hole-active">
                <Header cartClick={() => this.onCartBtnClick.bind(this)}
                        fetchSkuClick={()=>this.onFetchSkuBtnClick.bind(this)}
                        {...state.cart}
                />
                <div className="hole-img">
                    <img src={require('./image/xbx-banner.jpg')} alt="" style={{width:'100%'}}/>
                </div>
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
            </div>
        )
    }
}

HoleActive.contextTypes = {
    router: React.PropTypes.object
};

function select(store) {
    return Object.assign({},{state:store});
}

export default connect(select)(HoleActive)