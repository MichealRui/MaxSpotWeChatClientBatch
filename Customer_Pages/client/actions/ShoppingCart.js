import fetch from 'isomorphic-fetch';
import * as actionTypes from '../actionTypes/ShoppingCart';
import * as cartAction from './Cart';
import * as messageAction from './Message';


const domain = ENV.domain;

export function initShoppingCart() {
    return (dispatch) => {
        console.log('initShoppingCart');
        dispatch(initStart())
        fetch ( domain + '/web/buyer_api/get_cart.ction',
            {
                credentials : 'include',
                method : 'POST',
                mode : 'cors',
            }
        ).then((response) => response.json())
            .then(
                json => {
                    if(json.is_succ){
                        dispatch(initSuccess(json.skus))
                    }else{
                        dispatch(messageAction.setMessage({errorMessage:json.error_message}))
                    }
                }
            ).catch(e=>{
                console.warn(e);
                dispatch(messageAction.setMessage({errorMessage:'服务器错误'}))
            })
    }
}

export function initStart() {
    return {
        type : actionTypes.INIT_SHOPPING_CART_START
    }
}

function initSuccess(content) {
    return {
        type : actionTypes.INIT_SHOPPING_CART_SUCCESS,
        content
    }
}

export function deleteItem(item) {
    return (dispatch)=>{
        fetch( domain + '/web/buyer_api/remove_sku_from_cart.action',
            {
                credentials : 'include',
                method : 'POST',
                mode : 'cors',
                body : JSON.stringify(Object.assign({},item))
            }
        ).then(response => response.json())
            .then(
                json => {
                    if(json.is_succ){
                        dispatch(succDeleteItem(item))
                        dispatch(cartAction.initCart())
                    }else{
                        dispatch(messageAction.setMessage({errorMessage:json.error_message}))
                    }
                }
            ).catch(e=>dispatch(messageAction.setMessage({errorMessage:'服务器错误'})))
    }
}

function succDeleteItem(item) {
    return {
        type : actionTypes.DELETE_ITEM_SUCCESS,
        item
    }
}

export function decrementItem(item) {
    return (dispatch) => {
        fetch( domain + '/web/buyer_api/remove_sku_from_cart.action',
            {
                credentials : 'include',
                method : 'POST',
                mode : 'cors',
                body : JSON.stringify(Object.assign({},item))
            }
        ).then(response=>response.json())
            .then(json=>{
                if(json.is_succ){
                    dispatch(succDecrement(item))
                }else{
                    dispatch(messageAction.setMessage({errorMessage:json.error_message}))
                }
            }).catch(e=>dispatch(messageAction.setMessage({errorMessage:'服务器错误'})))
    }
}

function succDecrement(item) {
    return {
        type : actionTypes.DECREMENT_ITEM_SUCCESS,
        item
    }
}


export function incrementItem(item) {
    return (dispatch) => {
        fetch(domain + '/web/buyer_api/add_sku_to_cart.action',
            {
                credentials : 'include',
                method : 'POST',
                mode : 'cors',
                body : JSON.stringify(Object.assign({},item))
            }
        ).then(response=>response.json())
            .then(json=>{
                if(json.is_succ){
                    dispatch(succIncrement(item))
                }else{
                    dispatch(messageAction.setMessage({errorMessage:json.error_message}))
                }
            }).catch(e=>dispatch(messageAction.setMessage({errorMessage:'服务器错误'})))
    }
}

function succIncrement(item) {
    return {
        type : actionTypes.INCREMENT_ITEM_SUCCESS,
        item
    }
}

export function setMetionMessage(message) {
    return {
        type : actionTypes.SET_METION_MESSAGE,
        message
    }
}

export function toggleShop(shopId) {
    return {
        type : actionTypes.SHOPPINT_CART_TOGGLE_SHOP,
        shopId
    }
}

export function changeShopState(shopId) {
    return {
        type : actionTypes.SHOPPINT_CART_CHANGE_SHOP_STATE,
        shopId
    }
}

export function submitCart(stores) {
    return (dispatch) => {
        fetch( domain + '/web/buyer_api/submit_carts.ction',
            {
                credentials : 'include',
                method : 'POST',
                mode : 'cors',
                cache : 'default',
                body : JSON.stringify({
                    storeIds: stores
                })
            }
        ).then(response => response.json())
            .then(json => {
                if(json.is_succ){
                    // window.location.href =
                    //     'http://www.mjitech.com/buyer_confirm/wxpay/index.html?ordernumber=' + json.order.orderNumber;
                    dispatch(succSubmitCart(json.order.orderNumber));
                    dispatch(cartAction.initCart());
                }else{
                    dispatch(failSubmitCart(json));
                    dispatch(initShoppingCart())
                    dispatch(cartAction.initCart());
                }
            })
    }

}

function succSubmitCart(content) {
    return {
        type : actionTypes.SUBMIT_SHOPPING_CART_SUCCESS,
        content
    }

}

function failSubmitCart(content) {
    return {
        type : actionTypes.SUBMIT_SHOPPING_CART_FAIL,
        content
    }
}

