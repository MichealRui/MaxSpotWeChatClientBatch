import fetch from 'isomorphic-fetch';
import * as actionTypes from '../actionTypes/ConfirmOrder';
import * as cartAction from './Cart';
import * as messageAction from './Message';

const domain = ENV.domain;

export function initOrderConfirm(orderNumber) {
    return (dispatch) => {
        dispatch(initStart());
        fetch(domain + '/web/buyer_api/get_jsapi_pay_params.ction',
            {
                method : 'POST',
                mode : 'cors',
                credentials : 'include',
                body : JSON.stringify({
                    order_number : orderNumber
                })
            }
        ).then(response => response.json())
            .then(json => {
                if(json.is_succ){
                    dispatch(initSuccess({
                        orderInfo:json.order,
                        wxConfig : json.jssdkPayParams
                    }))
                }else{
                    dispatch(messageAction.setMessage({errorMessage:json.error_message}))
                }
            })
    }
}

export function initStart() {
    return {
        type : actionTypes.INIT_CONFIRM_ORDER_START
    }
}

export function initSuccess(content) {
    return {
        type : actionTypes.INIT_CONFIRM_ORDER_SUCCESS,
        content
    }
}