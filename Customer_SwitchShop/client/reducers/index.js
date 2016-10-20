/**
 * Created by wyf on 2016/10/19.
 */
import {INIT_START, INIT_SUCCESS, INIT_FAIL, SWITCH_SHOP_SUCCESS, SWITCH_SHOP_FAIL} from '../constants/ActionTypes';

const initState = {
    shopList:[
        {
            id:1,
            current:true,
            shopImg:'',
            shopName:'',
            shopAddress:'',
            shopClass:''
        }
    ]
};

function initStart(state) {
    return Object.assign({},state);
}

function initSuccess(state, content){
    return Object.assign(state, content);
}

function initFail(state){
    return Object.assign(state, {errorMessage:'init fail'});
}

function switchShopSuccess(state) {
    return Object.assign({},state, {successMessage:'switch shop success'});
}

function switchShopFail(state) {
    return Object.assign({},state, {errorMessage:'switch shop fail'});
}

export default function shopList(state=initState, action) {
    switch (action.type){
        case INIT_START:
            return initStart(state);
        case INIT_SUCCESS:
            return initSuccess(state, action.content);
        case INIT_FAIL:
            return initFail(state);
        case SWITCH_SHOP_SUCCESS:
            return switchShopSuccess(state);
        case SWITCH_SHOP_FAIL:
            return switchShopFail(state);
        default:
            return state;
    }
}