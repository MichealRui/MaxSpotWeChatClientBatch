/**
 * Created by cabbage on 16/10/2016.
 */


export const INIT_START = 'INIT_START';

export const INIT_SUCCESS = 'INIT_SUCCESS';

export const INIT_FAIL = 'INIT_FAIL';

export const ADD_LIKE = 'ADD_LIKE';


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

export function addLike() {
    return {
        type: ADD_LIKE
    }
}




