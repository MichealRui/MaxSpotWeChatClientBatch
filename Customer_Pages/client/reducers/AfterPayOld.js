/**
 * Created by cabbage on 16/10/2016.
 */
'use strict';
import * as oldactionTypes from '../actionTypes/AfterPayOld'
import AfterPayData from '../containers/AfterPayContainerOld/AfterPayData';

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
        case oldactionTypes.INIT_AFTERPAYOLD_SUCCESS:
            return initSuccess(itemInfo,action.cont);
        case oldactionTypes.ADD_LIKE:
            return addlike(itemInfo);
        default:
            return itemInfo;
    }
}