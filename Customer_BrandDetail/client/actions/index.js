/**
 * Created by cabbage on 16/10/2016.
 */
import fetch from 'isomorphic-fetch'

import BrandData from '../containers/Brand/BrandData'

export const INIT_START = 'INIT_START';

export const INIT_SUCCESS = 'INIT_SUCCESS';

export const INIT_FAIL = 'INIT_FAIL';

export const ADD_COUNT = 'ADD_COUNT';

export const ADD_COUNT_SUCC = 'ADD_COUNT_SUCC';

export const ADD_COUNT_FAIL = 'ADD_COUNT_FAIL';

export const CART_SUCC = 'CART_SUCC';

export const CART_FAIL = 'CART_FAIL';

export function initBrand() {
    return (dispatch)=>{
        //todo fetch
        dispatch(initSuccess(BrandData))
    };
}

export function initCart() {
    return (dispatch)=>{
        //todo fetch
        dispatch(initCartSucc())
    };
}

export function initCartFail() {
    return {
        type: CART_FAIL
    }
}

export function initCartSucc() {
    return {
        type: CART_Succ
    }
}

export function initStart() {
    return {
        type: INIT_START,
    }
}

export function initSuccess(cont) {
    return {
        type: INIT_SUCCESS,
        cont
    }
}

export function initFail() {
    return {
        type: INIT_FAIL
    }
}

export function addCount() {
    return (dispatch)=>{
        //todo fetch
        dispatch(initSuccess(BrandData))
    };
}



