/**
 * Created by ruibing on 17/1/16.
 */
import fetch from 'isomorphic-fetch';
import * as actionTypes from '../actionTypes/common/Weixin'
import * as messageAction from './Message';
const domain = ENV.domain;

export function initWxConfig(url, cb) {
    return (dispatch) => {
        // fetch( domain + '/web/buyer_api/test_login_with_openid.action',
        //     {
        //         credentials: 'include',
        //         method: 'POST',
        //         mode: 'cors',
        //         body: JSON.stringify({openid: "o41Mgv0eiCIKAZPpMdO1o-gGZrKs"})
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
                        dispatch(initWxConfigSucc(json.params));
                        dispatch(setWechatUrl(url));
                        dispatch(cb);
                    } else {
                        dispatch(initWxConfigErr( { errorMessage: json.error_message } ))
                    }
                } ).catch(e => dispatch(initWxConfigErr( { errorMessage: '服务器错误' } )))
        // ).catch(e => console.log(e))
    }

}

export function initWxpayConfig(cb,orderNum) {
    return (dispatch)=>{
        fetch(domain + '/web/buyer_api/get_jsapi_pay_params.ction',
            {
                method : 'POST',
                mode : 'cors',
                credentials : 'include',
                body : JSON.stringify({
                    order_number : orderNum
                })
            }
        ).then(response => response.json())
            .then(json => {
                if(json.is_succ){
                    dispatch(initWxPaySucc(json.jssdkPayParams));
                    dispatch(cb(json.order));
                }else{
                    dispatch(messageAction.setMessage({errorMessage:json.error_message}))
                }
            })
    }
}

export function initWxPaySucc(config) {
    return {
        type : actionTypes.INIT_WX_PAY_SUCC,
        config
    }
}

export function initWxConfigSucc(config) {
    return {
        type: actionTypes.INIT_WX_CONFIG_SUCC,
        config
    }
}

export function initWxConfigErr() {
    return {
        type: actionTypes.INIT_WX_CONFIG_ERR
    }
}

export function initSdk() {
    return {
        type: actionTypes.JSSDK_INITED
    }
}

export function initPaySdk() {
    return {
        type : actionTypes.JSSDK_PAY_INITED
    }
}

export function setWechatUrl(url) {
    return {
        type : actionTypes.SET_WECHAT_URL,
        url
    }
}