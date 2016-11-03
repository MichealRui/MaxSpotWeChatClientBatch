/**
 * Created by cabbage on 16/10/2016.
 */
import fetch from 'isomorphic-fetch'

import BrandData from '../containers/Brand/BrandData'

export const INIT_START = 'INIT_START';

export const INIT_SUCCESS = 'INIT_SUCCESS';

export const INIT_FAIL = 'INIT_FAIL';

export const ADD_TO_CART = 'ADD_TO_CART';

export const ADD_COUNT_SUCC = 'ADD_COUNT_SUCC';

export const ADD_COUNT_FAIL = 'ADD_COUNT_FAIL';

export const INIT_CART_SUCC = 'INIT_CART_SUCC';

export const INIT_CART_FAIL = 'INIT_CART_FAIL';

export const ERROR_ADD_CART = 'ERROR_ADD_CART';

export const SUCCESS_ADD_CART = 'SUCCESS_ADD_CART';

const domain = 'http://114.215.143.97';
export function initBrand() {
    return (dispatch)=>{
        //todo fetch
        fetch(domain + '/web/buyer_api/test_login_with_openid.ction',
            {
                credentials:'include',
                method:'POST',
                mode:'cors',
                body:JSON.stringify({openid:"o41Mgv7HMpgc16ViZCsVkeodDmjM"})
            }
        ).then(response=>response.json())
            .then(json=>{
                if(json.is_succ){
                    fetch(domain + '/web/buyer_api/brand_detail.ction',
                    {
                        credentials:'include',
                        method:'POST',
                        mode:'cors',
                    }).then((response)=>response.json()).then(
                        json=>{
                            console.log(2323);
                            console.log(json);
                        }
                    );
                    
                    dispatch(initSuccess(BrandData))
                    dispatch(initCart())
                }else{
                    dispatch(initFail({errorMessage:json.errorMessage}))
                }
            }
        ).catch(e=>dispatch(initFail({errorMessage:'服务器异常'})))

    };
}

export function initCart() {
    return (dispatch)=>{
        //todo fetch
        fetch(  domain + '/web/buyer_api/get_cart.ction',
            {
                credentials:'include',
                method:'POST',
                mode:'cors'
            }
        ).then(
            response=>response.json()
        ).then(
            json=>{
                console.log(json);
                if(json.is_succ) {
                    let count = [];
                    if(json.skus[0]){
                        count = json.skus[0].productList.map(
                            prod => {
                                console.log(prod);
                                return parseInt(prod.count);
                            }
                        )
                    }
                    count = count.reduce(
                        (previous,current,index,array)=>previous + current,0
                    );
                    dispatch(initCartSucc({total:count}))
                }else{
                    dispatch(initCartFail({errorMessage:json.error_message}))
                }
            }
        ).catch(e=>dispatch(initCartFail({errorMessage:'服务器异常'})))
    };
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

export function initStart() {
    return {
        type: INIT_START,
    }
}

export function initSuccess(cont) {
    return {
        type: INIT_SUCCESS,
        cont
    }
}

export function initFail(message) {
    return {
        type: INIT_FAIL,
        message
    }
}

export function addToCart(item) {
    console.log(11);
    console.log(item);
    return (dispatch)=>{
        //todo fetch
        fetch(domain + '/web/buyer_api/add_sku_to_cart.action',
            {
                credentials:'include',
                method:'POST',
                mode:'cors',
                Origin:'http://114.215.143.97',
                body:JSON.stringify(
                    Object.assign({},item)
                )
            }
        ).then(response=>response.json())
            .then(
                json=>{
                    if(json.is_succ){
                        dispatch(successAddCart())
                    }else{
                        dispatch(errorAddCart({errorMessage:json.errorMessage}))
                    }
                }
            ).catch(e=>dispatch(errorAddCart({errorMessage:'服务器异常'})))
    };
}

function successAddCart() {
    return {
        type:SUCCESS_ADD_CART,

    }
}

function errorAddCart(message) {
    return {
        type:ERROR_ADD_CART,
        message
    }
}



