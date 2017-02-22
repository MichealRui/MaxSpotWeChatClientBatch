import fetch from 'isomorphic-fetch';
import * as actionTypes from '../actionTypes/PaySuccess'
import * as message from '../actions/Message'
const domain = ENV.domain;
export function initPaySuccess(ordernumber) {
    return (dispatch) => {
        dispatch(initStart());
        fetch(domain + '/web/buyer_api/order_detail.ction',{
            credentials : 'include',
            method : 'POST',
            mode : 'cors',
            body : JSON.stringify({order_number:ordernumber})
        }).then(response => response.json())
            .then(json => {
                console.log('paysuccess');
                console.log(json);
                if(json.is_succ){
                    dispatch(initSuccess(json.order));
                }else{
                    dispatch(message.setMessage({errorMessage:json.error_message}))
                }
            }).catch(e=>{
                dispatch(message.setMessage({errorMessage:'服务器错误'}))
            })
    }
}

export function initStart() {
    return {
        type : actionTypes.INIT_PAY_SUCCESS_START,
    }
}

export function initSuccess(content) {
    return {
        type : actionTypes.INIT_PAY_SUCCESS_SUCCESS,
        content
    }
}