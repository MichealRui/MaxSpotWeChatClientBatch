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

const domain = 'http://114.215.143.97';

export function initWxConfig(url) {
    return (dispatch) => {


        fetch( domain + '/web/buyer_api/test_login_with_openid.ction ',
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                Origin: 'http://114.215.143.97',
                body: JSON.stringify({openid: "123456"})
            }
        ).then (
            fetch( domain + '/web/buyer_api/get_jsapi_config_params.ction',
                {
                    credentials: 'include',
                    method: 'POST',
                    mode: 'cors',
                    Origin: 'http://114.215.143.97',
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
        );


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
        dispatch(initSubContent(idPara))
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
                Origin: 'http://114.215.143.97',
                body: JSON.stringify(
                    Object.assign({}, item)
                )
            })
            .then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(successAddToCart())
                } else {
                    dispatch(errorAddToCart({errorMessage: json.error_message}))
                }
            }).catch(e => dispatch(errorAddToCart({ errorMessage: '服务器错误' })))
    }
}

export function startAddToCart() {

}

export function successAddToCart() {
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
                    dispatch(initFail())
                }
            }).catch(e => dispatch(initFail()))
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

export function initFail() {
    return {
        type: INIT_FAIL
    }
}

export function changeSubContent(key) {
    return {
        type: CHANGE_SUBCONTENT,
        key
    }
}