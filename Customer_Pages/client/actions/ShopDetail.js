import fetch from 'isomorphic-fetch';
import * as actionTypes from '../actionTypes/ShopDetail';
import * as messageAction from './Message';

const domain = ENV.domain;

export function initStore(storeId) {
    return (dispatch) => {
        dispatch(initStart());
        fetch( domain + '/web/buyer_api/store_detail.action',
            {
                credentials : 'include',
                method : 'POST',
                mode : 'cors',
                body : JSON.stringify({
                    storeId : storeId //7
                })
            }).then((response)=>response.json())
            .then(
                json => {
                   if(json.is_succ){
                       dispatch(initSuccess({
                           store : json.store
                       }));
                   }else{
                       dispatch(messageAction.setMessage({errorMessage:json.error_message}))
                   }
                }
            ).catch(e=>dispatch(messageAction.setMessage({errorMessage:'服务器错误'})))
    };
}

export function initStart() {
    return {
        type : actionTypes.INIT_SHOP_DETAIL_START
    }
}

export function initSuccess(content) {
    return {
        type : actionTypes.INIT_SHOP_DETAIL_SUCCESS,
        content
    }
}