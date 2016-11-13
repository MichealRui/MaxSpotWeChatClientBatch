/**
 * Created by ruibing on 16/10/11.
 */
import fetch from 'isomorphic-fetch'

import Util from '../util/WeChatUtil';

export const INIT_START = 'INIT_START';

export const INIT_SUCCESS = 'INIT_SUCCESS';

export const INIT_FAIL = 'INIT_FAIL';

export  const JSSDK_INITED = 'JS_SDK_INIT';

export const INIT_WX_CONFIG = 'INIT_WX_CONFIG';

export const INIT_WX_CONFIG_ERR = 'INIT_WX_CONFIG_ERR';

export const INIT_WX_CONFIG_SUCC = 'INIT_WX_CONFIG_SUCC';

const domain  = ENV.domain;

export function initWXConfig() {
    return (dispatch) => {
        fetch( domain + '/web/buyer_api/get_jsapi_config_params.ction',
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({url: window.location.href})
            }).then (response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(initWxConfigSucc(json.params))
                    dispatch(initPageContent())
                } else {
                    dispatch(initWxConfigErr(json.error_message))
                }
            })
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

export function initPageContent() {
    return (dispatch) => {
        dispatch(initStart())
        let order = Util.getUrlParam().ordernumber;
        console.log(order)
        fetch( domain + '/web/buyer_api/get_jsapi_pay_params.ction',
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify({
                    order_number : order
                })
            }
        ).then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(initSuccess(
                        {
                            orderInfo: json.order,
                            wxConfig: json.jssdkPayParams
                        }
                    ))
                } else {
                    dispatch(initFail())
                }
            })
    };

    // return {
    //     type: INIT_SUCCESS,
    //     content: {
    //         orderInfo: result.order,
    //         wxConfig: result.jssdkPayParams
    //     }
    // }
}

export function initSdk() {
    return {
        type: JSSDK_INITED
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