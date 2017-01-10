/**
 * Created by cabbage on 16/10/2016.
 */
'use strict';
import {INIT_START,INIT_SUCCESS,INIT_FAIL} from '../actions/index'
import {ADD_COUNT} from '../actions/index'
import {INIT_CART_SUCC, INIT_CART_FAIL} from '../actions/index'
import {ERROR_ADD_CART, SUCCESS_ADD_CART} from '../actions/index'
const domain = ENV.domain;//'http://114.215.143.97';
const defaultState = {
    skus:[],
    brand:[]
    // 'total':0
};

function initSucc(itemInfos, item) {
    // let brand = item.brand;
    // let skus = item.skus;
    // let info = [];
    // skus.forEach(function (value,index) {
    //     info.push({
    //         'storeid':1,
    //         'skuid':value.skuNumber,
    //         'image':'http://114.215.143.97' + value.imagePath,
    //         'brand':value.brandName,
    //         'name':value.shortName,
    //         'sub': value.height + ' N/A',
    //         'money':0
    //     })
    // })
    // let brandinfo = {
    //     'logo':'http://114.215.143.97'+brand.imagePath,
    //     'name':brand.name,
    //     'follows':brand.sortNumber,
    //     'intro':brand.story,
    //     'info':info
    // }
    return Object.assign({}, item)
    // return Object.assign({},itemInfos, brandinfo);
}

function addCartSucc(itemInfo){
    let state = Object.assign({}, itemInfo);
    state.total += 1;
    return state
}

function initCartSucc(iteminfo,cart) {
    return Object.assign({},iteminfo,{total:cart.total})
}

function initCartFail(iteminfo,message) {
    return Object.assign({},iteminfo,{errorMessage:message.errorMessage})
}

function finalState(itemInfo) {
    return Object.assign({},itemInfo);
}

function initFail(itemInfo,message) {
    return Object.assign({},itemInfo,{errorMessage:message.errorMessage})
}


export default function (itemInfo = defaultState,action) {
    switch (action.type){
        case INIT_SUCCESS:
            return initSucc(itemInfo, action.cont);
        case INIT_FAIL:
            return initFail(itemInfo,action.message);
        case ERROR_ADD_CART:
            return initCartFail(itemInfo,action.message);
        case SUCCESS_ADD_CART:
            return addCartSucc(itemInfo);
        case INIT_CART_SUCC:
            return initCartSucc(itemInfo,action.cart)
        case INIT_CART_FAIL:
            return initCartFail(itemInfo,action.message)
        default:
            return itemInfo;
    }
}