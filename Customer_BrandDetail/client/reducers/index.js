/**
 * Created by cabbage on 16/10/2016.
 */
'use strict';
import {INIT_START,INIT_SUCCESS,INIT_FAIL} from '../actions/index'
import {ADD_COUNT} from '../actions/index'
const defaultState = {
    'logo':'',
    'name':'',
    'follows':'',
    'intro':'',
    'info':[],
    'total':0
};

function initSucc(itemInfos, item) {
    return Object.assign({},itemInfos, item);
}

function addCount(itemInfo,item){
    let state = Object.assign({}, itemInfo);
    state.total += 1;
    return state
}

function finalState(itemInfo) {
    return Object.assign({},itemInfo);
}


export default function (itemInfo = defaultState,action) {
    switch (action.type){
        case INIT_SUCCESS:
            return initSucc(itemInfo, action.cont);
        case ADD_COUNT:
            return addCount(itemInfo);
        default:
            return itemInfo;
    }
}