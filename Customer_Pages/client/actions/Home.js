/**
 * Created by ruibing on 16/9/19.
 */

import fetch from 'isomorphic-fetch'
import * as actionTypes from '../actionTypes/Home';
import * as cartAction from './Cart';
import * as messageAction from './Message';

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