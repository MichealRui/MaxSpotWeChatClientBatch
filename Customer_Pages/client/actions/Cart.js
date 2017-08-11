/**
 * Created by ruibing on 17/1/13.
 */
import fetch from 'isomorphic-fetch';
import * as actionTypes from '../actionTypes/common/Cart'
import * as messageAction from '../actions/Message'

const domain = ENV.domain;
export function initCart() {
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
                    let count = json.skus.length ? json.skus.map(sku => sku.productList.map(
                        prod => parseInt(prod.count)
                    )).map(
                        count => count.reduce(
                            (previous, current, index, array) => previous + current, 0
                        )
                    ).reduce((previous, current, index, array) => previous + current, 0) : 0;
                    dispatch(initCartSucc({count: count}))
                } else {
                    dispatch(messageAction.setMessage({errorMessage: json.error_message}))
                }
            }).catch(e => dispatch(messageAction.setMessage({errorMessage: '服务器异常'})))
    }
}

export function initCartSucc(cart) {
    return {
        type: actionTypes.INIT_CART_SUCC,
        cart
    }
}

export function initCartFail(message) {
    return {
        type: actionTypes.INIT_CART_FAIL,
        message
    }
}

export function addToCart(item) {
    return (dispatch) => {
        fetch( domain + "/web/buyer_api/add_sku_to_cart.action ",
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(
                    Object.assign({}, item)
                )
            })
            .then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(successAddToCart(item))
                } else {
                    dispatch(messageAction.setMessage({errorMessage: json.error_message}))
                }
            }).catch(e => dispatch(messageAction.setMessage({ errorMessage: '服务器错误' })))
    }
}

export function successAddToCart(item) {
    return {
        type: actionTypes.SUCC_ADD_CART
    }
}

export function errorAddToCart(errorMessage) {
    return {
        type: actionTypes.FAIL_ADD_CART,
        errorMessage
    }
}

export function clearCart() {
    console.log('clearCart');
    return {
        type: actionTypes.CLEAR_CART
    }
}