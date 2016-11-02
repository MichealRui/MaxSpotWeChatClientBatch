/**
 * Created by wyf on 2016/10/19.
 */
import fetch from 'isomorphic-fetch';
import {INIT_START, INIT_SUCCESS, INIT_FAIL, ADD_INTO_CART_SUCCESS, ADD_INTO_CART_FAIL} from '../contants/ActionTypes';

const domain = ENV.domain;

export function initProductDetail(skuNumber, storeId) {
    return (dispatch)=>{
        dispatch(initStart());
        fetch( domain + '/web/buyer_api/sku_detail.ction',{
            method:'POST',
            mode:'cors',
            credentials: 'include',
            body:JSON.stringify({
                sku_number: skuNumber,//'UF000578',
                storeId: storeId
            })
        })
            .then(response=>response.json())
            .then(json=>{
                if(json.is_succ){
                    dispatch(
                        initSuccess(
                            Object.assign({}, json.productDetail, {storeId: storeId })
                        )
                    );
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

export function addIntoCart(item) {
    return (dispatch)=>{
        fetch(domain + "/web/buyer_api/add_sku_to_cart.action ",{
            method:'POST',
            mode:'cors',
            credentials: 'include',
            body:JSON.stringify(
                Object.assign({}, item)
            )
        }).then(response=>response.json())
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
