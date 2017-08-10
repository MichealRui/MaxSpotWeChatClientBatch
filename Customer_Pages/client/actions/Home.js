/**
 * Created by ruibing on 16/9/19.
 */

import fetch from 'isomorphic-fetch'
import * as actionTypes from '../actionTypes/Home';
import * as cartAction from './Cart';
import * as messageAction from './Message';
import * as shoppingCartAction from './ShoppingCart'
import * as loadingAction from './Loading'

const domain = ENV.domain;


function login() {
            fetch( domain + '/web/buyer_api/test_login_with_openid.action',
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({openid: "o41Mgv0eiCIKAZPpMdO1o-gGZrKs"})
            }
        )
}

// export function initWxConfig(url) {
//     return (dispatch) => {
//         fetch( domain + '/web/buyer_api/test_login_with_openid.action',
//             {
//                 credentials: 'include',
//                 method: 'POST',
//                 mode: 'cors',
//                 body: JSON.stringify({openid: "o41Mgv0eiCIKAZPpMdO1o-gGZrKs"})
//             }
//         ).then (
//         fetch( domain + '/web/buyer_api/get_jsapi_config_params.action',
//             {
//                 credentials: 'include',
//                 method: 'POST',
//                 mode: 'cors',
//                 body: JSON.stringify({url: url})
//             }
//         ).then(response => response.json())
//             .then( json => {
//                 if(json.is_succ) {
//                     dispatch(cartAction.initCart());
//                     dispatch(initWxConfigSucc(json.params))
//                 } else {
//                     dispatch(initWxConfigErr( { errorMessage: json.error_message } ))
//                 }
//             } ).catch(e => dispatch(initWxConfigErr( { errorMessage: '服务器错误' } )))
//         )
//     }
// }

// export function initCart() {
//     return (dispatch) => {
//         fetch( domain + '/web/buyer_api/get_cart.ction',
//             {
//                 credentials: 'include',
//                 method: 'POST',
//                 mode: 'cors',
//             }
//         ).then(response => response.json())
//             .then(json => {
//                 if(json.is_succ) {
//                     let count = json.skus.length ? json.skus.map(sku => sku.productList.map(
//                         prod => parseInt(prod.count)
//                     )).map(
//                         count => count.reduce(
//                             (previous, current, index, array) => previous + current, 0
//                         )
//                     ).reduce((previous, current, index, array) => previous + current, 0) : 0;
//                     dispatch(initCartSucc({count: count}))
//                 } else {
//                     dispatch(initCartFail({errorMessage: json.error_message}))
//                 }
//             }).catch(e => dispatch(initCartFail({errorMessage: '服务器异常'})))
//     }
// }
//
// export function initCartSucc(cart) {
//     return {
//         type: actionTypes.INIT_CART_SUCC,
//         cart
//     }
// }
//
// export function initCartFail(message) {
//     return {
//         type: actionTypes.INIT_CART_FAIL,
//         message
//     }
// }

// export function initWxConfigSucc(config) {
//     return {
//         type: actionTypes.INIT_WX_CONFIG_SUCC,
//         config
//     }
// }
//
// export function initWxConfigErr() {
//     return {
//         type: actionTypes.INIT_WX_CONFIG_ERR
//     }
// }
//
// export function initSdk() {
//     return {
//         type: actionTypes.JSSDK_INITED
//     }
// }

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
    };
    return (dispatch) => {
        dispatch(initSubContent(idPara));
        dispatch(cartAction.initCart());
    };
}

// export function addToCart(item) {
//     return (dispatch) => {
//         // dispatch(startAddToCart())
//         fetch( domain + "/web/buyer_api/add_sku_to_cart.action ",
//             {
//                 credentials: 'include',
//                 method: 'POST',
//                 mode: 'cors',
//                 body: JSON.stringify(
//                     Object.assign({}, item)
//                 )
//             })
//             .then(response => response.json())
//             .then(json => {
//                 if(json.is_succ) {
//                     dispatch(successAddToCart(item))
//                 } else {
//                     dispatch(errorAddToCart({errorMessage: json.error_message}))
//                 }
//             }).catch(e => dispatch(errorAddToCart({ errorMessage: '服务器错误' })))
//     }
// }
//
// export function successAddToCart(item) {
//     return {
//         type: actionTypes.SUCC_ADD_CART
//     }
// }
//
// export function errorAddToCart(errorMessage) {
//     return {
//         type: actionTypes.FAIL_ADD_CART,
//         errorMessage
//     }
// }
//
// export function clearCart() {
//     return {
//         type: actionTypes.CLEAR_CART
//     }
// }

export function initSubContent(d) {
    return (dispatch) =>  {
        dispatch(initStart());
        dispatch(loadingAction.toggleStatue({status:true}));
        dispatch(shoppingCartAction.initStart());
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
                        store: json.selectedStore,
                        channel : json.channel
                    }))
                    dispatch(loadingAction.toggleStatue({status:false}));
                } else {
                    dispatch(messageAction.setMessage({errorMessage: json.error_message}))
                }
            }).catch(e => dispatch(messageAction.setMessage({ errorMessage: '服务器错误' })))
    }
}

export function initStart() {
    return {
        type: actionTypes.INIT_START
    }
}

export function initSuccess(content) {
    return {
        type: actionTypes.INIT_SUCCESS,
        content
    }
}

// export function initFail(errorMessage) {
//     return {
//         type: actionTypes.INIT_FAIL,
//         errorMessage
//     }
// }

export function changeSubContent(key,subKey) {
    return {
        type: actionTypes.CHANGE_SUBCONTENT,
        key,
        subKey
    }
}

// export function setMessage(message) {
//     return {
//         type: actionTypes.SET_MESSAGE,
//         message
//     }
// }