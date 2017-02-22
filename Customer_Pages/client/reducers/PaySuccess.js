"use strict";
import * as actionTypes from '../actionTypes/PaySuccess';

function initStart(content) {
    return Object.assign({},content);
}

function initSuccess(content,orderInfo) {
    return Object.assign({},content,{order:orderInfo})
}

export default function (content={},action) {
    switch (action.type){
        case actionTypes.INIT_PAY_SUCCESS_START:
            return initStart(content);
        case actionTypes.INIT_PAY_SUCCESS_SUCCESS:
            return initSuccess(content,action.content);
        default:
            return content;
    }
}