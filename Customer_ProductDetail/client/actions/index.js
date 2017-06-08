/**
 * Created by wyf on 2016/10/19.
 */
import fetch from 'isomorphic-fetch';
import {INIT_START, INIT_SUCCESS, INIT_FAIL, ADD_INTO_CART_SUCCESS, ADD_INTO_CART_FAIL} from '../contants/ActionTypes';
import {INIT_CART_FAIL,INIT_CART_SUCC} from '../contants/ActionTypes';
import {INIT_WX_SUCC, INIT_WX_FAIL} from '../contants/ActionTypes'
import {JSSDK_INITED} from '../contants/ActionTypes'

const domain = ENV.domain;

export function initWx(url) {
    return (dispatch) => {
        fetch( domain + '/web/buyer_api/get_jsapi_config_params.action',
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({url: url})
            }
        ).then(response => response.json())
            .then( json => {
                if(json.is_succ) {
                    dispatch(initWxConfigSucc(json.params))
                } else {
                    dispatch(initWxConfigErr( { errorMessage: json.error_message } ))
                }
            } ).catch(e => dispatch(initWxConfigErr( { errorMessage: '服务器错误' } )))
    }
}

export function initWxConfigErr() {
    return {
        type: INIT_WX_FAIL
    }
}

export function initWxConfigSucc(config) {
    return {
        type: INIT_WX_SUCC,
        config
    }
}

export function initSdk() {
    return {
        type: JSSDK_INITED
    }
}

export function initProductDetailByGeo(skuNumber, geo){
    return (dispatch) => {
        fetch( domain + '/web/buyer_api/get_store_by_geo.action',
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    longitude:geo.longitude,
                    latitude:geo.latitude
                })
            }
        ).then(response => response.json())
            .then( json => {
                if(json.is_succ) {
                    dispatch(initProductDetail(skuNumber, json.store.id))
                } else {
                    dispatch(initFail( { errorMessage: json.error_message } ))
                }
            } ).catch(e => dispatch(initFail( { errorMessage: '服务器错误' } )))
    }
}

export function initProductDetail(skuNumber, storeId) {
    return (dispatch)=>{
        dispatch(initStart());
        fetch( domain + '/web/buyer_api/sku_detail.ction',{
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
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
                            Object.assign(
                                {}, {productDetail: json.sku}, {brand: json.brand}, {storeId: storeId }
                                )
                        )
                    );
                }else {
                    dispatch(initFail());
                }
            }).catch((e)=>console.log(JSON.stringify(e)));
    };
}

function initStart() {
    return {
        type:INIT_START
    };
}

function initSuccess(content) {
    return {
        type:INIT_SUCCESS,
        content
    };
}


function initFail() {
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
            }).catch((e)=>console.log(JSON.stringify(e)));
    }
}

function addIntoCartSuccess(productName) {
    return {
        type:ADD_INTO_CART_SUCCESS,
        productName
    };
}

function addIntoCartFail() {
    return {
        type:ADD_INTO_CART_FAIL
    };
}

export function initCart() {
    return (dispatch) => {
        fetch( domain + '/web/buyer_api/get_cart.ction',
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
            }
        ).then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    let count = json.skus.length ? json.skus.map(sku => sku.productList.map(
                        prod => parseInt(prod.count)
                    )).map(
                        count => count.reduce(
                            (previous, current, index, array) => previous + current, 0
                        )
                    ).reduce((previous, current, index, array) => previous + current, 0) : 0;
                    console.log(count)
                    dispatch(initCartSucc({count: count}))
                } else {
                    dispatch(initCartFail({errorMessage: json.error_message}))
                }
            }).catch(e => dispatch(initCartFail({errorMessage: '服务器异常'})))
    }
}

export function initCartFail(message) {
    return {
        type: INIT_CART_FAIL,
        message
    }
}

export function initCartSucc(cart) {
    return {
        type: INIT_CART_SUCC,
        cart
    }
}
