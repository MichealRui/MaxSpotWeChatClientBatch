'use strict';
import React from 'react';
import {connect} from 'react-redux';
import {initShoppingCart,setMetionMessage,deleteItem,decrementItem,incrementItem,toggleShop,changeShopState} from '../../actions/ShoppingCart'
import {setMessage} from '../../actions/Message'
import TopBar from '../../components/ShoppingCartComponents/TopBar/TopBar'
import ShoppingMessage from '../../components/ShoppingCartComponents/ShoppingMessage/ShoppingMessage'
import ProductSectionList from '../../components/ShoppingCartComponents/ProductSectionList/ProductSectionList'
require('./index.css')

class ShoppingCartContainer extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(initShoppingCart())
    }

    render(){
        const {state,dispatch} = this.props;
        const {shoppingCart} = state;
        const itemMethods = {
            increase : shopId => item => dispatch(incrementItem(Object.assign({},{storeId:''+shopId,skuId:''+item.id,count:"1"},{skuNumber:item.skuNumber}))),
            decrease : shopId => item => {
                if( item.count > 1) {
                    dispatch(decrementItem(Object.assign({},{storeId:''+shopId,skuId:''+item.id,count:"1"},{skuNumber:item.skuNumber,total_count:item.count})))
                }
            },
            delete : shopId => item => dispatch(deleteItem(Object.assign({},{storeId:''+shopId,skuId:''+item.id,count:""+item.count},{skuNumber:item.skuNumber}))),
            editState : shopId => () =>dispatch(changeShopState(shopId)),
            toggle : shopId => () => dispatch(toggleShop(shopId)),
            setMetionMessage : shopId => message => () => dispatch(setMetionMessage(message))
        };
        let {metionMessage,skus,activateShop,totalMoney} = shoppingCart;
        let takespace = {height:'1.2rem'};
        return (
            <div>
                <div className="shoppingCartContainer">
                    <TopBar />
                    <div className="takespace" style={takespace}></div>
                    <ShoppingMessage metionMsg = {metionMessage}
                                     clearMessage = {() => dispatch(setMetionMessage(""))}
                    />
                    <ProductSectionList
                        itemInfo = {skus}
                        activateShop = {activateShop}
                        itemMethods = {itemMethods}
                    />
                </div>
            </div>
        )
    }
}

function select(store) {
    return Object.assign({},{state:store});
}

export default connect (select)(ShoppingCartContainer)