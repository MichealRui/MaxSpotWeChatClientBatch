/**
 * Created by ruibing on 16/6/15.
 */

import fetch from 'isomorphic-fetch'

/* init shopping cart*/
export const INIT_SHOPPING_CART = 'INIT_SHOPPING_CART';
export const INIT_ERROR = 'INIT_ERROR';
export const INIT_SUCCESS = 'INIT_SUCCESS';
export const TOGGLE_SHOP = 'TOGGLE_SHOP';
export const CHANGE_SHOP_STATE = 'CHANGE_SHOP_STATE';
export const CLEAR_CART = 'CLEAR_CART';

export const INCREMENT_COUNTER_SUCC = 'INCREMENT_COUNTER_SUCC';
export const INCREMENT_COUNTER_FAIL = 'INCREMENT_COUNTER_FAIL';

export const DECREMENT_COUNTER_SUCC = 'DECREMENT_COUNTER_SUCC';
export const DECREMENT_COUNTER_FAIL = 'DECREMENT_COUNTER_FAILA';

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

/* fetch item ASYNC action*/
export const FETCH_ITEM_REQUEST = 'FETCH_ITEM_REQUEST';
export const FETCH_ITEM_RECEIVE = 'FETCH_ITEM_RECEIVE';
export const FETCH_ITEM_ERROR = 'FETCH_ITEM_ERROR';

/* set Message content*/
export const SET_MESSAGE = 'SET_MESSAGE';

const domain = ENV.domain;

export function initShoppingCart() {
    return (dispatch) => {
        fetch( domain + '/web/buyer_api/get_cart.ction',
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
            }
        ).then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(initSuccess(json.skus))
                } else {
                    dispatch(setMessage({errorMessage: json.error_message}));
                    dispatch(initError())
                }
            })
    }
}

export function initSuccess(skus) {
    return {
        type: INIT_SUCCESS,
        skus
    }
}

export function initError() {
    return {
        type: INIT_ERROR
    }
}

export function toggleShop(shopId) {
    return {
        type: TOGGLE_SHOP,
        shopId
    }
}


export function changeShopState(shopId) {
    return {
        type:CHANGE_SHOP_STATE,
        shopId
    }
}

export function clearCart() {
    return {
        type: CLEAR_CART
    }
}

export function fetchItem(skuNumber) {
    return (dispatch) =>  {
        dispatch(fetchItemRequest(skuNumber));
        fetch( domain + '/web/seller_api/wx_get_sku_detail.action',//'http://localhost:9000/fetchitem',
                {
                    credentials: 'include',
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                        open_id: '123456',
                        sku_number: skuNumber,
                    })
                }
        )
        .then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    if(json.sku && json.sku.skuNumber == skuNumber) {
                        dispatch(fetchItemReceive(json.sku));
                    } else {
                        dispatch(setMessage({errorMessage: json.error_message}));
                        dispatch(fetchItemError(skuNumber))
                    }
                } else {
                    dispatch(setMessage({errorMessage: json.error_message}));
                    dispatch(fetchItemError(skuNumber))
                }
            }).catch(e => dispatch(setMessage({errorMessage: '服务器异常'})))
    }
}

function fetchItemRequest(skuId) {
    return {
        type: FETCH_ITEM_REQUEST,
        skuId
    }
}

function fetchItemReceive(item) {
    return {
        type: FETCH_ITEM_RECEIVE,
        item,
    }
}

function fetchItemError(skuId) {

    return {
        type: FETCH_ITEM_ERROR,
        skuId: skuId
    }
}

export function setMessage(message) {
    return {
        type: SET_MESSAGE,
        message
    }
}

export function addItem(item) {
    return {
        type: ADD_ITEM,
        item
	}
}

export function deleteItem(shopId, item) {
    return {
        type: DELETE_ITEM,
        item,
        shopId
    }
}

/*导出加一的方法*/
export function increment(shopId, item){
    return (dispatch) => {
        fetch( domain + '/web/buyer_api/add_sku_to_cart.action', {
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                storeId: '' + shopId,
                skuId: '' + item.id,
                count: '' + (parseInt(item.count) + 1)
            })
        }).then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(succIncrement(shopId, item))
                } else {
                    dispatch(failIncrement(shopId, item, json.error_message))
                }
            }).catch( e => dispatch(failIncrement(shopId, item, '服务器异常')))
    };
}

function succIncrement(shopId, item) {
    return {
        type:INCREMENT_COUNTER_SUCC,
        item,
        shopId
    }
}

function failIncrement(shopId, item, error) {
    return {
        type: INCREMENT_COUNTER_FAIL,
        item,
        shopId,
        errorMessage: error
    }
}

/*导出减一的方法*/
export function decrement(shopId, item){

    return (dispatch) => {
        fetch( domain + '/web/buyer_api/remove_sku_from_cart.action', {
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                storeId: '' + shopId,
                skuId: '' + item.id,
                count: "1"
            })
        }).then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(succDecrement(shopId, item))
                } else {
                    dispatch(failDecrement(shopId, item, json.error_message))
                }
            }).catch( e => dispatch(failDecrement(shopId, item, '服务器异常')))
    };
}

function succDecrement(shopId, item) {
    return {
        type:DECREMENT_COUNTER_SUCC,
        item,
        shopId
    }
}

function failDecrement(shopId, item, error) {
    return {
        type:DECREMENT_COUNTER_FAIL,
        item,
        shopId,
        errorMessage: error
    }
}


