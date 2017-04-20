import fetch from 'isomorphic-fetch';
import * as actionTypes from '../actionTypes/Promotion';
import * as messageAction from './Message';
import * as cartAction from './Cart';

const domain = ENV.domain;

export function initPromotion(type,storeId) {
    return (dispatch)=>{
        dispatch(initStart());
        fetch(domain + '/web/buyer_api/promotion_channel_detail.action', {
            credentials: 'include',
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({store_id: storeId,type:type})
        }).then((response) => response.json())
                .then(json => {
                    if(json.is_succ){
                        dispatch(initSuccess(Object.assign({},{skus:json.skuitems})))
                    }else{
                        dispatch(messageAction.setMessage({errorMessage:json.error_message}))
                    }
                }).catch(e=>messageAction.setMessage({errorMessage:'服务器问题'}));
        dispatch(cartAction.initCart());
    }
}

export function clearPromotion() {
    return (dispatch)=>{
        dispatch(initSuccess(Object.assign({},{skus:[]})));
    }
}

function initStart() {
    return {
        type: actionTypes.INIT_PROMOTION_START
    }
}

function initSuccess(content) {
    return {
        type : actionTypes.INIT_PROMOTION_SUCCESS,
        content
    }
}
