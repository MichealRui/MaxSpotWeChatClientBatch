import fetch from 'isomorphic-fetch';
import * as actionTypes from '../actionTypes/OrderDetail';
import * as messageAction from './Message';

const domain = ENV.domain;

export function initOrderDetail(ordernumber) {
    return (dispatch) => {
        dispatch(initStart());
        fetch( domain + '/web/buyer_api/order_detail.ction',
            {
                credentials : 'include',
                method : 'POST',
                mode : 'cors',
                body : JSON.stringify({
                    order_number:ordernumber
                })
            }).then((response)=>response.json())
            .then(
                json => {
                   if(json.is_succ){
                       dispatch(initSuccess(json.order));
                   }else{
                       dispatch(messageAction.setMessage({errorMessage:json.error_message}))
                   }
                }
            ).catch(e=>dispatch(messageAction.setMessage({errorMessage:'服务器错误'})))
    };
}

export function initStart() {
    return {
        type : actionTypes.INIT_ORDERDETAIL_START
    }
}

export function initSuccess(content) {
    return {
        type : actionTypes.INIT_ORDERDETAIL_SUCCESS,
        content
    }
}