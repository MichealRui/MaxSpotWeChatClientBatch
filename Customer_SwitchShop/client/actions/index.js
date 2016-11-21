/**
 * Created by wyf on 2016/10/19.
 */
import fetch from 'isomorphic-fetch';
import {INIT_START, INIT_SUCCESS, INIT_FAIL, SWITCH_SHOP_SUCCESS, SWITCH_SHOP_FAIL} from '../constants/ActionTypes';
const domain = 'http://114.215.143.97';
export function initShopList(shopid) {
    return (dispatch)=>{
        dispatch(initStart());
        fetch( domain + '/web/buyer_api/get_all_stores.action',{
            method:'POST',
            mode:'cors',
            Origin:'*'
        })
            .then(response=>response.json())
            .then(json=>{
                if(json.is_succ){
                    console.log('shopid:'+shopid);
                    dispatch(initSuccess(json,shopid));
                }else {
                    dispatch(initFail());
                }
            })
            .catch((e)=>console.log(JSON.stringify(e)));
    };
}

export function initStart() {
    return {
        type:INIT_START
    };
}

export function initSuccess(content,storeId) {
    return {
        type:INIT_SUCCESS,
        content,
        storeId
    };
}


export function initFail() {
    return {
        type:INIT_FAIL
    };
}

export function switchShop(shop_id) {
    console.log(getState());
    console.log(shop_id);
    return (dispatch)=>{
        fetch(domain + '/web/buyer_api/get_all_stores.action',{
            method:'POST',
            mode:'cors',
            Origin:'*',
        })
            .then(response=>response.json())
            .then(json=>{
                console.log(2);
                console.log(json);
                if(json.is_succ){
                    json.stores.map()
                    dispatch(switchShopSuccess(json));
                }else {
                    dispatch(switchShopFail());
                }
            })
            .catch((e)=>console.log(JSON.stringify(e)));
    }
}

export function switchShopSuccess(shopName) {
    console.log('shopName');
    console.log( shopName);
    return {
        type:SWITCH_SHOP_SUCCESS,
        shopName
    };
}

export function switchShopFail() {
    return {
        type:SWITCH_SHOP_FAIL
    };
}
