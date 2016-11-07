/**
 * Created by cabbage on 16/10/2016.
 */
'use strict';
import {INIT_START,INIT_SUCCESS,INIT_FAIL,ADD_LIKE} from '../actions/index'
import AfterPayData from '../containers/AfterPay/AfterPayData';

function initSuccess(itemInfo, item) {
    return Object.assign({},itemInfo, item);
}

function addlike(iteminfo) {
    let state = Object.assign({},iteminfo)
    state.count ++ ;
    return state;
}

export default function (itemInfo = AfterPayData,action) {
    switch (action.type){
        case INIT_SUCCESS:
            return initSuccess(itemInfo,action.cont);
        case ADD_LIKE:
            return addlike(itemInfo);
        default:
            return itemInfo;
    }
}