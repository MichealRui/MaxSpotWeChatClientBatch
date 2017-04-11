'use strict';
import React from 'react';
import { connect }  from 'react-redux';
import Header from '../../components/active_Header/Header';
import Banner from '../../components/Banner/Banner';
import SubContent from '../active_SubContent/SubContent';
import CartContainer from '../CartContainer/CartContainer';
import SkuContainer from '../SkuContainer/SkuContainer';
import FetchSkuContainer from '../../containers/FetchSkuContainer/FetchSkuContainer';
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
        this._campaignId = this.props.params.campaignId;
        this._type = this.props.params.type;
    }

    componentWillMount() {
        const { dispatch } = this.props;
        // dispatch(initMainContent());
        if(this._type != 0){
            //新品特惠
            console.log('新品特惠');
        }else if(this._campaignId != 0){
            //活动
            console.log('活动');
            dispatch(initActivity(this._campaignId))
        }

    }

    onCartBtnClick() {
        const {dispatch} = this.props;
        dispatch(setCartStatus(CartStatus.SHOW_CART));
        dispatch(fetchCart());
        this.setState({
            cartVisible: true
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

    render() {
        let {state, dispatch} = this.props;
        let domain = IMAGECONFIG.host;
        let bannerStyle = {width:'100%', height:350}
        let containerStyle = {width:'100%','padding-left':'60','padding-right':'50', 'background-color':'white'};
        return (
            <div className="pageContainer" id="pageContainer">
                <Header cartClick={() => this.onCartBtnClick.bind(this)}
                        fetchSkuClick={()=>this.onFetchSkuBtnClick.bind(this)}
                        {...state.cart}
                />
                {/*<Banner bannerData={state.activity.banner}/>*/}
                <div className="activeBannerContainer" style={containerStyle}>
                    <img src={domain + state.activity.banner} style={bannerStyle}/>
                </div>
                <SubContent
                    contentData={state.activity}
                    changeContent={(key, subKey) => dispatch(changeSubContent(key, subKey))}
                    addToCart={(item) => dispatch(addToCart(item))}
                    showProduct={(item) => this.onProductDetailClick.bind(this)(item)}
                    selector = {state.selector}
                    style={{backgroundColor:'#fff'}}
                    ActiveType={this._type}
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
                              onCartClick = {()=>this.onCartBtnClick.bind(this)}
                              {...state.cart}
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

export default connect(select)(Active)