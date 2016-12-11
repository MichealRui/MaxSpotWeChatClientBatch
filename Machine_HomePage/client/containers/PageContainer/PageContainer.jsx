'use strict';
import ReactDOM from 'react-dom'
import React from 'react'
import { connect }  from 'react-redux';
import Header from '../../components/Header/Header'
import Banner from '../../components/Banner/Banner'
import SubContent from '../../containers/SubContent/SubContent'
import CartContainer from '../../containers/CartContainer/CartContainer';
import SkuContainer from '../../containers/SkuContainer/SkuContainer';
import PaySuccContainer from '../../containers/PaySuccContainer/PaySuccContainer';
import { initMainContent } from '../../actions/index'
import { addToCart, deleteOneFromCart, removeFromCart } from '../../actions/index'
import {changeSubContent} from '../../actions/index'
import {fetchSku} from '../../actions/index'
import {fetchCart} from '../../actions/index'
import {submitCart, clearQr, fetchOrderStatus} from '../../actions/index'


class PageContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cartVisible:false,
            skuVisible:false,
            paySuccVisible:false
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(initMainContent());
        dispatch(fetchCart())
    }

    onCartBtnClick() {
        console.log("show");
        const {dispatch} = this.props;
        dispatch(fetchCart());
        this.setState({
            cartVisible: true
        })
    }

    hideCart() {
        console.log("hide");
        const {dispatch} = this.props;
        dispatch(clearQr())
        this.setState({
            cartVisible: false
        })
    }

    onProductDetailClick(item){
        console.log('sku_show');
        console.log(item);
        let {dispatch} = this.props;
        dispatch(fetchSku(item.skuNumber));
        this.setState({
            skuVisible:true
        })
    }

    hideProductDetail(){
        console.log('sku_hide');
        this.setState({
            skuVisible:false
        })
    }

    onPaySuccClick(){
        this.setState({
            paySuccVisible:true
        })
    }
    hidePaySucc(){
        this.setState({
            paySuccVisible:false
        })
    }

    render() {
        let {state, dispatch} = this.props;
        return (
            <div className="pageContainer">
                <Header cartClick={() => this.onCartBtnClick.bind(this)}
                        {...state.cart}
                        paySuccClick={()=>this.onPaySuccClick.bind(this)}
                />
                <Banner bannerData={state.banner}/>
                <SubContent
                    contentData={state.currentSub}
                    changeContent={(key, subKey) => dispatch(changeSubContent(key, subKey))}
                    storeData={state.storeInfo}
                    addToCart={(item) => dispatch(addToCart(item))}
                    showProduct={(item) => this.onProductDetailClick.bind(this)(item)}
                    selector = {state.selector}
                />
                <CartContainer visible={this.state.cartVisible}
                               onCancel={ () => this.hideCart.bind(this) }
                               {...state.cart}
                               addToCart={(item) => dispatch(addToCart(item))}
                               decItem={(item) => dispatch(deleteOneFromCart(item))}
                               removeItem={(item) => dispatch(removeFromCart(item))}
                               submit={() => dispatch(submitCart())}
                               qr={state.qrCode}
                               order={state.order}
                               fetchOrder={(or) => dispatch(fetchOrderStatus(or))}
                />
                <SkuContainer visible={this.state.skuVisible}
                              onCancel={()=>this.hideProductDetail.bind(this)}
                              product={state.product}
                />
                <PaySuccContainer visible={this.state.paySuccVisible}
                                  onCancel={()=>this.hidePaySucc.bind(this)}

                />
            </div>
        )
    }
}

function select(store) {
    console.log('dispatched');
    return Object.assign({}, {state: store})
}

export default connect(select)(PageContainer)