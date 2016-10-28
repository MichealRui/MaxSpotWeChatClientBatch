/**
 * Created by wyf on 2016/10/19.
 */
import fetch from 'isomorphic-fetch';
import {INIT_START, INIT_SUCCESS, INIT_FAIL, ADD_INTO_CART_SUCCESS, ADD_INTO_CART_FAIL} from '../contants/ActionTypes';

const domain = 'http://114.215.143.97/';

export function initProductDetail(product_id) {
    return (dispatch)=>{
        dispatch(initStart());
        fetch( domain + '/web/buyer_api/sku_detail.ction',{
            method:'POST',
            mode:'cors',
            Origin:'*',
            body:JSON.stringify({
                sku_number: 'UF000578',
                storeId: '7'
            })
        })
            .then(response=>response.json())
            .then(json=>{
                if(json.is_succ){
                    dispatch(initSuccess(json.productDetail));
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

export function initSuccess(content) {
    return {
        type:INIT_SUCCESS,
        content
    };
}


export function initFail() {
    return {
        type:INIT_FAIL
    };
}

export function addIntoCart(product_id) {
    return (dispatch)=>{
        fetch('',{
            method:'POST',
            mode:'cors',
            Origin:'*',
            body:JSON.stringify({
                productId:product_id
            })
        })
            .then(response=>response.json())
            .then(json=>{
                if(json.is_succ){
                    dispatch(addIntoCartSuccess(json.productName));
                }else {
                    dispatch(addIntoCartFail());
                }
            })
            .catch((e)=>console.log(JSON.stringify(e)));
    }
}

export function addIntoCartSuccess(productName) {
    return {
        type:ADD_INTO_CART_SUCCESS,
        productName
    };
}

export function addIntoCartFail() {
    return {
        type:ADD_INTO_CART_FAIL
    };
}
