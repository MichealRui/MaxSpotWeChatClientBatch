/**
 * Created by ruibing on 16/11/8.
 */
import fetch from 'isomorphic-fetch'

import CartStatus from '../../client/containers/CartContainer/CartStatus'

export const INIT_SUCC = 'INIT_SUCC';

export const ADDTO_CART = 'ADDTO_CART';

export const SUCC_ADD_CART = 'SUCC_ADD_CART';

export const FAIL_ADD_CART = 'FAIL_ADD_CART';

export const DELETE_ONE_CART = 'DELETE_ONE_CART';

export const SUCC_DELETE_CART = 'SUCC_DELETE_CART';

export const FAIL_DELETE_CART = 'FAIL_DELETE_CART';

export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const SUCC_REMOVE_CART = 'SUCC_REMOVE_CART';

export const FAIL_REMOVE_CART = 'FAIL_REMOVE_CART';

export const CLEAR_CART = 'CLEAR_CART';

export const SUCC_CLEAR_CART = 'SUCC_CLEAR_CART';

export const CHANGE_SUBCONTENT = 'CHANGE_SUBCONTENT';

export const FETCH_SKU = 'FETCH_SKU';

export const SUCC_FETCH_SKU = 'SUCC_FETCH_SKU';

export const SET_DETAIL = 'SET_DETAIL';

export const SUCC_FETCH_CART = 'SUCC_FETCH_CART';

export const QR_CLICK = 'QC_CLICK';

export const SUBMIT_CART='SUBMIT_CART';

export const SET_PAYMENT_CODE = 'SET_PAYMENT_CODE';

export const SET_ORDER = 'SET_ORDER';

export const SET_CART_STATUS = 'SET_CART_STATUS';

export const FETCH_ORDER_ERROR = 'FETCH_ORDER_ERROR';

export const SET_ORDER_STATUS = 'SET_ORDER_STATUS';

export const SET_RECOMMEND = 'SET_RECOMMEND';

export const SET_ERRORMESSAGE = 'SET_ERRORMESSAGE';

export const SUCC_INIT_ACTIVITY = 'SUCC_INIT_ACTIVITY';

const domain = (ENV.domain == 'http://www.mjitech.com')  ? 'http://10.16.66.36:9090' : 'http://10.16.66.36:8080';

export function initMainContent () {
    return (dispatch) => {
        fetch(domain+'/maxbox_pc/local_api/get_mainpage_data.action',//'local_api/get_mainpage_data.action',
        {
                // credentials: 'include',
                method: 'POST',
                // mode: 'cors',
            }).then(response => response.json()
            .then(json => {
                if(json.is_succ) {
                    dispatch(initSucc({
                        banner: json.banners,
                        content: json.categories,
                        store: json.selectedStore,
                        channel: json.channel
                    }));
                    dispatch(fetchCart())
                } else {
                    console.log(json);
                    console.log('init error')
                }
            })
        );
    };

    // return (dispatch) => {
    //     dispatch(initSucc({
    //         banner: mock.banners,
    //         content: mock.categories
    //     }))
    // }
}

function initSucc(data) {
    return {
        type: INIT_SUCC,
        data
    }
}

export function addToCart(item) {
    return (dispatch) => {
        fetch( domain+"/maxbox_pc/local_api/add_sku_to_cart.action",
            {
                // credentials: 'include',
                method: 'POST',
                // mode: 'cors',
                body: JSON.stringify(
                    Object.assign({}, {
                    skuId: '' + item.id,
                    count: '1'
                    })
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
    };
    // return (dispatch) => {
    //     dispatch(successAddToCart(item))
    // }
}

export function deleteOneFromCart(item) {
    return (dispatch) => {
        fetch( domain+"/maxbox_pc/local_api/remove_sku_from_cart.action",
            {
                // credentials: 'include',
                method: 'POST',
                // mode: 'cors',
                body: JSON.stringify(
                    Object.assign({}, {
                    skuId: '' + item.id,
                    count: '1'
                    })
                )
            })
            .then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(succDeleteItem(item))
                } else {
                    dispatch(errorAddToCart({errorMessage: json.error_message}))
                }
            }).catch(e => dispatch(errorAddToCart({ errorMessage: '服务器错误' })))
    };
    // return (dispatch) => {
    //     dispatch(succDeleteItem(item))
    // }
}

export function succDeleteItem(item) {
    return {
        type: SUCC_DELETE_CART,
        item
    }
}

export function removeFromCart(item) {

    return (dispatch) => {
        fetch(domain+'/maxbox_pc/local_api/remove_sku_from_cart.action',
            {
                // credentials: 'include',
                method: 'POST',
                // mode: 'cors',
                body: JSON.stringify(
                    Object.assign({}, {
                    skuId: '' + item.id,
                        count: item.count
                    })
                )
            }).then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(succRemoveItem(item))
                } else {

                }
            })
    };
    //
    // return (dispatch) => {
    //     console.log(item)
    //     dispatch(succRemoveItem(item))
    // }
}

export function succRemoveItem(item) {
    return {
        type: SUCC_REMOVE_CART,
        item
    }
}

export function fetchCart() {
    return (dispatch) => {
        fetch(domain+'/maxbox_pc/local_api/get_cart.action',
            {
                // credentials: 'include',
                method: 'POST',
                // mode: 'cors',
            }).then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(succFetchCart(json.skus))
                    // dispatch(setReco(json.skus[0].recommends))
                } else {

                }
            })
    };
    // return (dispatch) => {
    //     return dispatch(succFetchCart(
    //         Object.assign({}, cart).skus
    //     ))
    // }
}

// export function setReco(recommends){
//     return {
//         type: SET_RECOMMEND,
//         recommends
//     }
// }

export function succFetchCart(skus) {
    return {
        type:SUCC_FETCH_CART,
        skus
    }
}

export function successAddToCart(item) {
    return {
        type: SUCC_ADD_CART,
        item
    }
}

export function errorAddToCart(errorMessage) {
    return {
        type: FAIL_ADD_CART,
        errorMessage
    }
}

export function clearCart() {
    return (dispatch) => {
        fetch(domain+'/maxbox_pc/local_api/clear_cart.action',
            {
                // credentials: 'include',
                method: 'POST',
                // mode: 'cors',
            }
        ).then(response => response.json())
            .then(json => {
                if (json.is_succ) {
                    dispatch(succClearCart())
                } else {

                }
            })
    };
    // return (dispatch) => {
    //     return dispatch(succClearCart())
    // }
}

function succClearCart() {
    return {
        type: SUCC_CLEAR_CART,
    }
}

export function changeSubContent(key, subKey) {
    return {
        type: CHANGE_SUBCONTENT,
        key,
        subKey
    }
}

export function submitCart() {
    return (dispatch) => {
        fetch(domain+'/maxbox_pc/local_api/submit_cart.action',
            {
                // credentials: 'include',
                method: 'POST',
                // mode: 'cors',
            }
        ).then(response =>response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(setOrder(json.order));
                    dispatch(setCartStatus(CartStatus.SHOW_LOADING));
                    dispatch(fetchQrCode(json.order.orderNumber))
                } else {
                    console.log(json)
                }
            })
    };

    // return (dispatch) => {
    //     dispatch(setOrder({
    //         orderNumber: 'S012016120918937',
    //         status:1
    //     }));
    //     dispatch(fetchQrCode('S012016120918937'))
    // }
}

export function setOrder(order) {
    return {
        type: SET_ORDER,
        order
    }
}

export function fetchQrCode(orderNumber) {
    return (dispatch) => {
        fetch(domain+'/maxbox_pc/local_api/request_pay.action', {
            // credentials: 'include',
            method: 'POST',
            // mode: 'cors',
            body: JSON.stringify(
                {'orderNumber': orderNumber}
            )
        }).then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch({
                        type: SET_PAYMENT_CODE,
                        qrCode: json.payUrl,
                    })
                    dispatch(setCartStatus(CartStatus.SHOW_QR))
                    // dispatch(succClearCart())
                } else {

                }
            })
    };
    // let url = 'http://www.baidu.com';
    // return(dispatch) => {
    //     dispatch({
    //         type: SET_PAYMENT_CODE,
    //         qrCode: url
    //     });
    //     dispatch(setCartStatus(CartStatus.SHOW_QR))
    // }
}

export function clearQr() {
    return {
        type:SET_PAYMENT_CODE,
        qrCode: ''
    }
}

export function setCartStatus(cartStatus) {
    return {
        type:SET_CART_STATUS,
        cartStatus
    }
}

export function fetchOrderStatus(orderNumber) {
    return (dispatch) => {
        fetch(domain+'/maxbox_pc/local_api/get_order_detail.action',{
            // credentials: 'include',
            method: 'POST',
            // mode: 'cors',
            body: JSON.stringify({
                orderNumber : orderNumber
            })
        }).then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(setOrder(json.order))
                } else {

                }
            }).catch(e => dispatch({
                type:FETCH_ORDER_ERROR
            }
        ))
    }
}

// export function setOrderStatus () {
//     return {
//         type:SET_ORDER_STATUS
//     }
// }

export function fetchSku(skuNumber) {
    return (dispatch) => {
        fetch(domain+'/maxbox_pc/local_api/sku_detail.action',
            {
                // credentials: 'include',
                method: 'POST',
                // mode: 'cors',
                body: JSON.stringify(
                    {sku_number: skuNumber}
                )
            }).then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(succFetchSku(
                        {
                            productDetail: json.sku,
                            brand: json.brand
                        }
                    ))
                } else {
                }
            })
    };
    // return (dispatch)=>{
    //     let product = productMock;
    //     return dispatch(succFetchSku({
    //         productDetail: product.sku,
    //         brand: product.brand
    //     }))
    // }
}

export function succFetchSku(product_detail) {
    return{
        type: SUCC_FETCH_SKU,
        product:product_detail
    }
}

export function setDetailDialog(prod) {
    return {
        type: SET_DETAIL,
        prod
    }
}

export function initActivity(campaignId) {
    return (dispatch) => {
        fetch(domain + '/maxbox_pc/local_api/get_campaign_detail.action',
            {
                // credentials: 'include',
                method: 'POST',
                // mode: 'cors',
                body:JSON.stringify({
                    campaignId : campaignId
                })
            }
        ).then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(succInitActivity({...json,activeTag:"active"+campaignId}))
                } else {
                    console.log('error')
                }
            })
    }
    // return (dispatch) => {
    //     dispatch(succInitActivity({...activeData}))
    // }
}

export function initChannelActivity(type) {
    return(dispatch)=>{
        fetch(domain + '/maxbox_pc/local_api/get_channel_detail.action',
            {
                // credentials: 'include',
                method: 'POST',
                // mode: 'cors',
                body:JSON.stringify({
                    type : type
                })
            }
        ).then(response => response.json())
            .then(json => {
                if(json.is_succ) {

                    dispatch(succInitActivity(Object.assign({},{products:json.skuitems,banner:json.headUrl,activeTag:"channel"+type})))
                } else {
                    console.log('error')
                }
            })
    }
}

export function clearActivity() {
    return(dispatch)=>{
        dispatch(succInitActivity(Object.assign({},{products:[],banner:''})))
    }
}

export function succInitActivity({products, banner,activeTag}) {
    return {
        type: SUCC_INIT_ACTIVITY,
        products, banner,activeTag
    }
}

function setErrorMessage(message) {
    return {
        type : SET_ERRORMESSAGE,
        message
    }
}