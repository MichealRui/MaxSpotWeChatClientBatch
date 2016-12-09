/**
 * Created by ruibing on 16/11/8.
 */
import fetch from 'isomorphic-fetch'

import mock from '../mock/main'

import cartMock from '../mock/shopping'

import productMock from '../mock/productdetail'

export const INIT_SUCC = 'INIT_SUCC';

export const ADDTO_CART = 'ADDTO_CART';

export const SUCC_ADD_CART = 'SUCC_ADD_CART';

export const FAIL_ADD_CART = 'FAIL_ADD_CART';

export const DELETE_ONE_CART = 'DELETE_ONE_CART';

export const SUCC_DELETE_CART = 'SUCC_DELETE_CART';

export const FAIL_DELETE_CART = 'FAIL_DELETE_CART';

export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const SUCC_REMOVE_CART = 'SUCC_REMOVE_CART';

export const FAIL_REMOVE_CART = 'FAIL_REMOVE_CART';

export const CLEAR_CART = 'CLEAR_CART';

export const CHANGE_SUBCONTENT = 'CHANGE_SUBCONTENT';

export const FETCH_SKU = 'FETCH_SKU';

export const SUCC_FETCH_SKU = 'SUCC_FETCH_SKU';

export const SET_DETAIL = 'SET_DETAIL';

export const SUCC_FETCH_CART = 'SUCC_FETCH_CART';

const cart = cartMock;



export function initMainContent () {
    // fetch('',
    //     {
    //         credentials: 'include',
    //         method: 'POST',
    //         mode: 'cors',
    //         body: JSON.stringify(
    //             Object.assign({}, item)
    //         )
    //     }).then(response => response.json()
    //     .then(json => {
    //         if(json.is_succ) {
    //
    //         }
    //     })
    // )
    return (dispatch) => {
        dispatch(initSucc({
            banner: mock.banners,
            content: mock.categories,
            store: mock.selectedStore
        }))
    }
}

function initSucc(data) {
    console.log("########@@@@@@@@@@@@@@@")
    return {
        type: INIT_SUCC,
        data
    }
}

export function addToCart(item) {
    // return (dispatch) => {
    //     fetch( "local_api/add_sku_to_cart.action",
    //         {
    //             credentials: 'include',
    //             method: 'POST',
    //             mode: 'cors',
    //             body: JSON.stringify(
    //                 Object.assign({}, {
    //                 skuId: '' + item.id,
    //                 count: '1'
    //                 })
    //             )
    //         })
    //         .then(response => response.json())
    //         .then(json => {
    //             if(json.is_succ) {
    //                 dispatch(successAddToCart(item))
    //             } else {
    //                 dispatch(errorAddToCart({errorMessage: json.error_message}))
    //             }
    //         }).catch(e => dispatch(errorAddToCart({ errorMessage: '服务器错误' })))
    // }
    return (dispatch) => {
        dispatch(successAddToCart(item))
    }
}

export function deleteOneFromCart(item) {
    // return (dispatch) => {
    //     fetch( "local_api/remove_sku_from_cart.action",
    //         {
    //             credentials: 'include',
    //             method: 'POST',
    //             mode: 'cors',
    //             body: JSON.stringify(
    //                 Object.assign({}, {
    //                 skuId: '' + item.id,
    //                 count: '1'
    //                 })
    //             )
    //         })
    //         .then(response => response.json())
    //         .then(json => {
    //             if(json.is_succ) {
    //                 dispatch(succDeleteItem(item))
    //             } else {
    //                 dispatch(errorAddToCart({errorMessage: json.error_message}))
    //             }
    //         }).catch(e => dispatch(errorAddToCart({ errorMessage: '服务器错误' })))
    // }
    return (dispatch) => {
        dispatch(succDeleteItem(item))
    }
}

export function succDeleteItem(item) {
    return {
        type: SUCC_DELETE_CART,
        item
    }
}

export function removeFromCart(item) {

    // return (dispatch) => {
    //     fetch('local_api/remove_sku_from_cart.action', {
    //         credentials: 'include',
    //         method: 'POST',
    //         mode: 'cors',
    //         body: JSON.stringify(
    //             Object.assign({}, {
    //             skuId: '' + item.id,
    //                 count: item.count
    //                 })
    //             )
    //     }).then(response => response.json())
    //         .then(json => {
    //             if(json.is_succ) {
    //                 dispatch(succFetchCart(json.skus))
    //             } else {
    //
    //             }
    //         })
    // }

    return (dispatch) => {
        console.log(item)
        dispatch(succRemoveItem(item))
    }
}

export function succRemoveItem(item) {
    return {
        type: SUCC_REMOVE_CART,
        item
    }
}

export function fetchCart() {
    // return (dispatch) => {
    //     fetch('local_api/get_cart.action', {
    //         credentials: 'include',
    //         method: 'POST',
    //         mode: 'cors',
    //     }).then(response => response.json())
    //         .then(json => {
    //             if(json.is_succ) {
    //                 dispatch(succFetchCart(json.skus))
    //             } else {
    //
    //             }
    //         })
    // }
    return (dispatch) => {
        return dispatch(succFetchCart(
            Object.assign({}, cart).skus
        ))
    }
}

export function succFetchCart(skus) {
    return {
        type:SUCC_FETCH_CART,
        skus
    }
}

export function successAddToCart(item) {
    return {
        type: SUCC_ADD_CART,
        item
    }
}

export function errorAddToCart(errorMessage) {
    return {
        type: FAIL_ADD_CART,
        errorMessage
    }
}

export function clearCart() {
    return {
        type: CLEAR_CART
    }
}

export function changeSubContent(key, subKey) {
    return {
        type: CHANGE_SUBCONTENT,
        key,
        subKey
    }
}

export function fetchSku() {
    // return (dispatch) => {
    //     fetch('/local_api/sku_detail.action', {
    //         credentials: 'include',
    //         method: 'POST',
    //         mode: 'cors',
    //         body: JSON.stringify(
    //             {sku_number: skuNumber}
    //         )
    //     }).then(response => response.json())
    //         .then(json => {
    //             if(json.is_succ) {
    //                 dispatch(setDetailDialog(
    //                     {
    //                         productDetail: json.sku,
    //                         brand: json.brand
    //                     }
    //                 ))
    //             } else {
    //                 dispatch()
    //             }
    //         })
    // }
    return (dispatch)=>{
        let product = productMock;
        return dispatch(succFetchSku(product))
    }
}

export function succFetchSku(product_detail) {
    return{
        type: SUCC_FETCH_SKU,
        product:product_detail
    }
}

export function setDetailDialog(prod) {
    return {
        type: SET_DETAIL,
        prod
    }
}