import fetch from 'isomorphic-fetch';
import * as actionTypes from '../actionTypes/OrderList'
import * as message from '../actions/Message'
const domain = ENV.domain;
export function initOrderList() {
    return (dispatch) => {
        dispatch(initStart());
        fetch(domain + '/web/buyer_api/order_list.ction',{
            credentials : 'include',
            mode : 'cors',
            method : 'POST',
            body : JSON.stringify({storeId : 0})
        }).then(response => response.json())
            .then(json=>{
                if(json.is_succ){
                    dispatch(initSuccess(json.orders))
                }else{
                    message.setMessage({errorMessage:json.error_message})
                }
            }).catch(e=>message.setMessage({errorMessage:'服务器错误'}))
    }
}
export function initStart() {
    return {
        type : actionTypes.INIT_ORDERLIST_START,
    }
}

export function initSuccess(content) {
    return {
        type : actionTypes.INIT_ORDERLIST_SUCCESS,
        content
    }
}