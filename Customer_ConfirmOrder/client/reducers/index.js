/**
 * Created by ruibing on 16/10/11.
 */
import {INIT_START ,INIT_SUCCESS, INIT_FAIL} from '../actions/index';
import { JSSDK_INITED } from '../actions/index';

const defaultContent = {
    orderInfo: {
        remainTime:'',
        productItems:[],
        actualMoney:'',
        productDiscount:'',
        limitDiscount:'',
        totalMoney:''
    },
    wxConfig: {
        timestamp: '',
        nonceStr: '',
        signature: '',
    }
};

function initStart(state) {
    return Object.assign({}, state)
}

function initSuccess(state, updated){
    return Object.assign({}, updated);
}

function initFail(state) {
    return Object.assign({}, state)
}

function JSSDKInited(state) {
    return Object.assign({}, state, {sdkInited: true})
}
export default function (
    content=defaultContent, action) {
    switch (action.type) {
        case INIT_START:
            return initStart(content);
        case INIT_SUCCESS:
            return initSuccess(content, action.content);
        case INIT_FAIL:
            return initFail(content);
        case JSSDK_INITED:
            return JSSDKInited(content);
        default:
            return content;
    }
}