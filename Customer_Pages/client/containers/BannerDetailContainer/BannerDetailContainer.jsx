'use strict';
import React from 'react';
import { connect }  from 'react-redux';
import BrandItem from '../../components/BrandDetailComponents/BrandItem/BrandItem'
import Message from '../../components/CommonComponents/Message/Message';
import { setMessage } from '../../actions/Message'
import { clearCart, addToCart, initCart } from '../../actions/Cart'
import {initBannerDetail} from '../../actions/BannerDetail'
import ButtonButtom from '../../components/HomeComponents/Cart/Cart'

require('./index.css');

class BannerDetailContainer extends React.Component{
    constructor(props){
        super(props);
        this._bannnerId = this.props.params.campaignId;
        this._storeId = this.props.params.storeId;
    }
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(initBannerDetail(this._storeId,this._bannnerId))
    }
    render(){
        const { dispatch, state } = this.props;
        const {bannerDetail,message,cart} = state;
        let domain = ENV.domain;
        let defaultImg = DEFALUT_INFO.bannerDefaultImg;
        return (
            <div className="bannerDetailContainer">
                <div className="bannerContainerHeader">
                    {
                       bannerDetail.bannerImg ?
                           <img src={domain + bannerDetail.bannerImg} alt=""/>
                           :<img src={defaultImg} alt=""/>
                    }
                </div>
                <Message msgContent={message}
                         clearMessage={() => dispatch(setMessage({errorMessage: ""}))}
                />
                <BrandItem items={bannerDetail.products} storeId={this._storeId} addToCart={(item)=>dispatch(addToCart(item))}/>
                <ButtonButtom
                    cart={cart.cart}
                    clearCart={()=>dispatch(clearCart())}
                />

            </div>
        )

    }
}


function select(store) {
    return Object.assign({}, {state: store})
}

export default connect(select)(BannerDetailContainer)