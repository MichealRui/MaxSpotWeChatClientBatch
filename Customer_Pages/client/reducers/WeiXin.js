/**
 * Created by ruibing on 17/1/17.
 */
import * as actionTypes from '../actionTypes/common/Weixin'

function initWxConfigSucc(state, config) {
    return Object.assign({}, state, { wxConfig: config })
}

function initWxConfigErr(state) {
    return Object.assign({}, state, {errorMessage: ''})
}

function JSSDKInited(state) {
    return Object.assign({}, state, {sdkInited: true})
}

function JSSDKPayInited(state) {
    return Object.assign({}, state, {sdkPayInited: true})
}

function setWechatUrl(state,url) {
    return Object.assign({},state,{wechat_url:url})
}

export default function(state={}, action) {
    switch (action.type) {
        case actionTypes.INIT_WX_CONFIG_SUCC:
            return initWxConfigSucc(state, action.config);
        case actionTypes.INIT_WX_CONFIG_ERR:
            return initWxConfigErr(state);
        case actionTypes.JSSDK_INITED:
            return JSSDKInited(state);
        case actionTypes.JSSDK_PAY_INITED:
            return JSSDKPayInited(state);
        case actionTypes.SET_WECHAT_URL :
            return setWechatUrl(state,action.url);
        default:
            return state;
    }
}