/**
 * Created by cabbage on 16/10/2016.
 */
'use strict';
import {INIT_START,INIT_SUCCESS,INIT_FAIL} from '../actions/index'

const PaySuccessData = {
    order:[]
}

function initSuccess(itemInfo, item) {
    return Object.assign({},itemInfo, item);
}


export default function (itemInfo = PaySuccessData,action) {
    switch (action.type){
        case INIT_SUCCESS:
            return initSuccess(itemInfo, action.orderlist);
        default:
            return itemInfo;
    }
}