/**
 * Created by cabbage on 16/10/2016.
 */
'use strict';
import {INIT_START,INIT_SUCCESS,INIT_FAIL} from '../actions/index'
import {ADD_LIKE,CANCEL_LIKE} from '../actions/index'

function initSucc(itemInfos, item) {
    return Object.assign({},itemInfos, item);
}

function addlikes(itemInfo) {
    return changeLike(itemInfo,(item)=>{
        item.header.like = true;
        return item;
    })
}

function cancellikes(itemInfo) {
    return changeLike(itemInfo,(item)=>{
        item.header.like = false;
        return item;
    })
}

function changeLike(itemInfo,option) {
    let newItem = Object.assign({},itemInfo);
    newItem = newItem.map(
        (item) => option(item)
    );
    return finalState(newItem);
}

function finalState(itemInfo) {
    return Object.assign({},itemInfo);
}
export default function (itemInfos = {},action) {
    switch (action.type){
        case INIT_SUCCESS:
            return initSucc(itemInfos, action.cont);
        case ADD_LIKE:
            return addlikes(itemInfos);
        case CANCEL_LIKE:
            return cancellikes(itemInfos);
        default:
            return itemInfos;
    }
}