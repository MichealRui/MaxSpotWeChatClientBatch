/**
 * Created by cabbage on 16/10/2016.
 */
'use strict';
import {INIT_START,INIT_SUCCESS,INIT_FAIL} from '../actions/index'
import {CHANGE_LIKE} from '../actions/index'

const defaultState = {
    header : {
        shopImg:"",
        shopName:"",
        like:false,
    },
    info:[
        {
            imagepath:"",
        },
        {
            imagepath:"",
        },
    ],
    gallery : {
        shopAddress:"",
        shopTime:"",
        telephone:"",
    }
}

function initSucc(itemInfos, item) {
    return Object.assign({},itemInfos, item);
}


function changeLike(itemInfo) {
    let newItem = Object.assign({},itemInfo);
    newItem.header.like = newItem.header.like ? false : true;
    return finalState(newItem);
}


function finalState(itemInfo) {
    return Object.assign({},itemInfo);
}


export default function (itemInfos = defaultState,action) {
    switch (action.type){
        case INIT_SUCCESS:
            return initSucc(itemInfos, action.cont);
        case CHANGE_LIKE:
            return changeLike(itemInfos);
        default:
            return itemInfos;
    }
}