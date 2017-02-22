'use strict';
import React from 'react';
import {connect} from 'react-redux';
import {initShoppingCart,setMetionMessage,deleteItem,decrementItem,incrementItem,toggleShop,changeShopState,submitCart} from '../../actions/ShoppingCart'
import {setMessage} from '../../actions/Message'
import {clearCart} from '../../actions/Cart'
import TopBar from '../../components/ShoppingCartComponents/TopBar/TopBar'
import ShoppingMessage from '../../components/ShoppingCartComponents/ShoppingMessage/ShoppingMessage'
import ProductSectionList from '../../components/ShoppingCartComponents/ProductSectionList/ProductSectionList'
import Empty from '../../components/ShoppingCartComponents/Empty/Empty'
import BottomBar from '../../components/ShoppingCartComponents/BottomBar/BottomBar'
import Message from '../../components/CommoonComponents/Message/Message';

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
        const {shoppingCart,message} = state;
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
        const bottomMsg = {

        }
        let {metionMessage,skus,activateShop,totalMoney,order_number} = shoppingCart;
        let takespace = {height:'1.2rem'};
        return (
            <div>
                <div className="shoppingCartContainer">
                    <TopBar />
                    <div className="takespace" style={takespace}></div>
                    <ShoppingMessage metionMsg = {metionMessage}
                                     clearMessage = {() => dispatch(setMetionMessage(""))}
                    />
                    <Message msgContent={message}
                             clearMessage={() => dispatch(setMessage({errorMessage: ""}))}
                    />
                    <ProductSectionList
                        itemInfo = {skus}
                        activateShop = {activateShop}
                        itemMethods = {itemMethods}
                    />
                    <Empty itemInfo = {skus}/>
                    <BottomBar
                        totalMoney = {totalMoney}
                        activateStore = {activateShop}
                        order_number = {order_number}
                        //clearCart = {()=>dispatch(clearCart())}
                        submitCart = {(stores)=>dispatch(submitCart(stores))}
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