/**
 * Created by cabbage on 16/10/2016.
 */
import fetch from 'isomorphic-fetch';
import * as oldactionTypes from '../actionTypes/AfterPayOld';
import * as messageAction from './Message';



export function initAfterPay(ori_state) {
    let PaySuccessData = {
        ori_state : ori_state,
        count : 0
    }
    return (dispatch)=>{
        dispatch(initSuccess(PaySuccessData))
    };
}

export function initStart() {
    return {
        type: oldactionTypes.INIT_AFTERPAYOLD_START,
    }
}

export function initSuccess(cont) {
    return {
        type: oldactionTypes.INIT_AFTERPAYOLD_SUCCESS,
        cont
    }
}

export function initFail() {
    return {
        type: oldactionTypes.INIT_AFTERPAYOLD_FAIL
    }
}

export function addLike() {
    return {
        type: oldactionTypes.ADD_LIKE
    }
}




