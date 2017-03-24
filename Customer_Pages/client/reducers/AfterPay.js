/**
 * Created by cabbage on 16/10/2016.
 */
'use strict';
import * as actionTypes from '../actionTypes/AfterPay'

function initSuccess(itemInfo, item) {
    return Object.assign({},itemInfo, item);
}

function addlike(iteminfo) {
    let state = Object.assign({},iteminfo)
    state.count ++ ;
    return state;
}

var AfterPayData = {
    ori_state : "1",
    count : 0
};

export default function (itemInfo = AfterPayData,action) {
    switch (action.type){
        case actionTypes.INIT_AFTERPAY_SUCCESS:
            return initSuccess(itemInfo,action.cont);
        default:
            return itemInfo;
    }
}