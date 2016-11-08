/**
 * Created by ruibing on 16/11/8.
 */
import fetch from 'isomorphic-fetch'

import mock from '../mock/index'

export const INIT_SUCC = 'INIT_SUCC';

export const ADDTO_CART = 'ADDTO_CART';

export const SUCC_ADD_CART = 'SUCC_ADD_CART';

export const FAIL_ADD_CART = 'FAIL_ADD_CART';

export const CLEAR_CART = 'CLEAR_CART';

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
    return (dispatch) => {
        // dispatch(startAddToCart())
        fetch( domain + "/web/buyer_api/add_sku_to_cart.action ",
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                Origin: 'http://114.215.143.97',
                body: JSON.stringify(
                    Object.assign({}, item)
                )
            })
            .then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(successAddToCart(item))
                } else {
                    dispatch(errorAddToCart({errorMessage: json.error_message}))
                }
            }).catch(e => dispatch(errorAddToCart({ errorMessage: '服务器错误' })))
    }
}

export function startAddToCart() {

}

export function successAddToCart(item) {
    return {
        type: SUCC_ADD_CART
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