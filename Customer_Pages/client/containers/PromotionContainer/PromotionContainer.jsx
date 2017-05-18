"use strict";
import React from 'react';
import {connect} from 'react-redux';
import {initPromotion} from '../../actions/Promotion';
import PromotionContent from '../../components/PromotionComponents/PromotionContent/PromotionContent';
import Message from '../../components/CommonComponents/Message/Message';
import {setMessage} from '../../actions/Message';
import {addToCart,clearCart} from '../../actions/Cart';
import ButtonButtom from '../../components/HomeComponents/Cart/Cart'
require('./index.css');

class PromotionContainer extends React.Component{
    constructor(props){
        super(props);
        this._storeId = this.props.params.storeId;
        this._type = this.props.params.type;
    }
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(initPromotion(this._type,this._storeId))
    }
    render(){
        const {state,dispatch} = this.props;
        const {promotion , message ,cart} = state;
        let store = {id:this._storeId}
        return (
            <div className="promotionContainer">
                <Message msgContent={message}
                         clearMessage={() => dispatch(setMessage({errorMessage: ""}))}/>
                <PromotionContent promotionData={promotion} storeInfo={store} type={this._type} addCart={(item)=>dispatch(addToCart(item))}/>
                <ButtonButtom cart={cart.cart}
                              clearCart={() => dispatch(clearCart())} />
            </div>
        )
    }
}

function select(store) {
    return Object.assign({},{state:store});
}

export default connect(select)(PromotionContainer)

