import fetch from 'isomorphic-fetch';
import * as actionTypes from '../actionTypes/AfterPay';
import * as messageAction from './Message';

const domain = ENV.domain;

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
        type: START,
    }
}

export function initSuccess(cont) {
    return {
        type: actionTypes.INIT_AFTERPAY_SUCCESS,
        cont
    }
}



