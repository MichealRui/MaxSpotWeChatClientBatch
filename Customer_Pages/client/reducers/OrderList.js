"use strict";
import * as actionTypes from '../actionTypes/OrderList';

function initStart(content) {
    return Object.assign({},content);
}

function initSuccess(content,orderInfo) {
    return Object.assign({},content,{orders:orderInfo})
}
export default function (content={},action) {
    switch (action.type){
        case actionTypes.INIT_ORDERLIST_START:
            return initStart(content);
        case actionTypes.INIT_ORDERLIST_SUCCESS:
            return initSuccess(content,action.content);
        default:
            return content;
    }
}