/**
 * Created by ruibing on 16/9/19.
 */

import fetch from 'isomorphic-fetch'

export const CHANGE_SUBCONTENT = 'CHANGE_SUBCONTENT';

export const INIT_START = 'INIT_START';

export const INIT_SUCCESS = 'INIT_SUCCESS';

export const INIT_FAIL = 'INIT_FAIL';

export const ADDTO_CART = 'ADDTO_CART';

export const SUCC_ADD_CART = 'SUCC_ADD_CART';

export const FAIL_ADD_CART = 'FAIL_ADD_CART';

export const CLEAR_CART = 'CLEAR_CART';

export const INIT_WX_CONFIG = 'INIT_WX_CONFIG';

export const INIT_WX_CONFIG_SUCC = 'INIT_WX_CONFIG_SUCC';

export const INIT_WX_CONFIG_ERR = 'INIT_WX_CONFIG_ERR';

export  const JSSDK_INITED = 'JS_SDK_INIT';

export const LOCATION_SUCC = 'LOCATION_SUCC';

export const LOCATION_FAIL = 'LOCATION_FAIL';

export const INIT_CART_SUCC = 'INIT_CART_SUCC';

export const INIT_CART_FAIL = 'INIT_CART_FAIL';

export const SET_MESSAGE = 'SET_MESSAGE';

const domain = ENV.domain;

export function initWxConfig(url) {
    return (dispatch) => {

        // fetch( 'http://114.215.143.97' + '/web/buyer_api/market_data.action',
        //     {
        //         credentials: 'include',
        //         method: 'POST',
        //         mode: 'cors',
        //         body: JSON.stringify({storeId: '7'})
        //     }
        // ).then (
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
                        dispatch(initCart());
                        dispatch(initWxConfigSucc(json.params))
                    } else {
                        dispatch(initWxConfigErr( { errorMessage: json.error_message } ))
                    }
                } ).catch(e => dispatch(initWxConfigErr( { errorMessage: '服务器错误' } )))
        // );


        // fetch('http://www.mjitech.com/web/buyer_api/get_jsapi_config_params.ction',
        //     {
        //         method: 'POST',
        //         mode: 'cors',
        //         Origin: '*',
        //         body: JSON.stringify({url: url})
        //     }
        // ).then(response => response.json())
        //     .then( json => {
        //         if(json.is_succ) {
        //             dispatch(initWxConfigSucc(json.config))
        //         } else {
        //             dispatch(initWxConfigErr( { errorMessage: json.error_message } ))
        //         }
        //     } ).catch(e => dispatch(initWxConfigErr( { errorMessage: '服务器错误' } )))
    }
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

export function initCartSucc(cart) {
    return {
        type: INIT_CART_SUCC,
        cart
    }
}

export function initCartFail(message) {
    return {
        type: INIT_CART_FAIL,
        message
    }
}

export function initWxConfigSucc(config) {
    return {
        type: INIT_WX_CONFIG_SUCC,
        config
    }
}

export function initWxConfigErr() {
    return {
        type: INIT_WX_CONFIG_ERR
    }
}

export function initSdk() {
    return {
        type: JSSDK_INITED
    }
}

export function locationSucc(geo) {
    let geoPara = {
        url: domain + '/web/buyer_api/get_mainpage_data_by_geo.action',
        para: Object.assign({}, {longitude: geo.longitude, latitude: geo.latitude})
    };
    return (dispatch) => {
        dispatch(initSubContent(geoPara))
    };
}

export function locationFail() {
    let geoPara = {
        url: domain + '/web/buyer_api/get_mainpage_data_by_geo.action',
        para: {}
    };
    return (dispatch) => {
        dispatch(initSubContent(geoPara))
    };
}

export function initByStoreId(id) {
    let idPara = {
        url: domain + '/web/buyer_api/get_mainpage_data.action',
        para: Object.assign({}, {storeId: id})
    }
    return (dispatch) => {
        dispatch(initSubContent(idPara));
        dispatch(initCart());
    };
}

export function addToCart(item) {
    return (dispatch) => {
        // dispatch(startAddToCart())
        fetch( domain + "/web/buyer_api/add_sku_to_cart.action ",
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(
                    Object.assign({}, item)
                )
            })
            .then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(successAddToCart(item))
                } else {
                    dispatch(errorAddToCart({errorMessage: json.error_message}))
                }
            }).catch(e => dispatch(errorAddToCart({ errorMessage: '服务器错误' })))
    }
}

export function startAddToCart() {

}

export function successAddToCart(item) {
    return {
        type: SUCC_ADD_CART
    }
}

export function errorAddToCart(errorMessage) {
    return {
        type: FAIL_ADD_CART,
        errorMessage
    }
}

export function clearCart() {
    return {
        type: CLEAR_CART
    }
}

export function initSubContent(d) {
    console.log(" initing ");
    return (dispatch) =>  {
        dispatch(initStart());
        fetch( d.url,
            {
                method: 'POST',
                mode: 'cors',
                Origin: '*',
                body: JSON.stringify(
                    d.para
                )
            }
        ).then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(initSuccess({
                        banner: json.banners,
                        content: json.categories,
                        store: json.selectedStore
                    }))
                } else {
                    dispatch(initFail({errorMessage: json.error_message}))
                }
            }).catch(e => dispatch(initFail({ errorMessage: '服务器错误' })))
    }
}

export function initStart() {
    return {
        type: INIT_START
    }
}

export function initSuccess(content) {
    return {
        type: INIT_SUCCESS,
        content
    }
}

export function initFail(errorMessage) {
    return {
        type: INIT_FAIL,
        errorMessage
    }
}

export function changeSubContent(key) {
    return {
        type: CHANGE_SUBCONTENT,
        key
    }
}

export function setMessage(message) {
    return {
        type: SET_MESSAGE,
        message
    }
}