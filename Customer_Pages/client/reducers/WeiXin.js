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

export default function(state={}, action) {
    switch (action.type) {
        case actionTypes.INIT_WX_CONFIG_SUCC:
            return initWxConfigSucc(state, action.config);
        case actionTypes.INIT_WX_CONFIG_ERR:
            return initWxConfigErr(state);
        case actionTypes.JSSDK_INITED:
            return JSSDKInited(state);
        default:
            return state;
    }
}