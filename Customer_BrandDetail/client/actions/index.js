/**
 * Created by cabbage on 16/10/2016.
 */
import fetch from 'isomorphic-fetch'

import BrandData from '../containers/Brand/BrandData'

export const INIT_START = 'INIT_START';

export const INIT_SUCCESS = 'INIT_SUCCESS';

export const INIT_FAIL = 'INIT_FAIL';

export const ADD_COUNT = 'ADD_COUNT';

export function initBrand() {
    return (dispatch)=>{
        dispatch(initSuccess(BrandData))
    };
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
    return {
        type:ADD_COUNT,
    }
}



