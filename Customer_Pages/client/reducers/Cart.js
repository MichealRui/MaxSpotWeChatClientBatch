/**
 * Created by ruibing on 17/1/17.
 */

import * as actionTypes from '../actionTypes/common/Cart'

function initCartSucc(content, cart) {
    return Object.assign({}, content, {cart: {count: cart.count,animate:false}})
}

function initCartFail(content, message) {
    return Object.assign({}, content, {
        errorMessage: message.errorMessage
    })
}

function succAddCart(content, ) {
    let {cart} = {...content}
    let state = Object.assign({}, { cart:{count:cart.count, animate:cart.animate}})
    state.cart.count += 1;
    state.cart.animate = true;
    return state
}

function clearCart(state, cart) {
    return Object.assign({}, state, {
        cart: {count:0, remainTime:'',animate:false}
    })
}

function failAddCart(state, message) {
    return Object.assign({}, state, {
        errorMessage: message.errorMessage
    })
}


export default function(state={}, action) {
    switch (action.type) {
        case actionTypes.CLEAR_CART:
            return clearCart(state);
        case actionTypes.SUCC_ADD_CART:
            return succAddCart(state, action.item);
        case actionTypes.FAIL_ADD_CART:
            return failAddCart(state, action.errorMessage);
        case actionTypes.INIT_CART_SUCC:
            return initCartSucc(state, action.cart);
        case actionTypes.INIT_CART_FAIL:
            return initCartFail(state, action.message);
        default:
            return state;
    }
}