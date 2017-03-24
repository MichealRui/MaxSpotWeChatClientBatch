import fetch from 'isomorphic-fetch';
import * as actionTypes from '../actionTypes/SwitchShop';
import * as messageAction from './Message';

const domain = ENV.domain;

export function initShopList(shopId) {
    return (dispatch) => {
        dispatch(initStart());
        fetch( domain + '/web/buyer_api/get_all_stores.action',
            {
                credentials : 'include',
                method : 'POST',
                mode : 'cors',
            }).then((response)=>response.json())
            .then(
                json => {
                   if(json.is_succ){
                       dispatch(initSuccess({
                            shopList : json.stores,
                            currentShopId : shopId
                       }))
                   }else{
                       dispatch(messageAction.setMessage({errorMessage:json.error_message}))
                   }
                }
            ).catch(e=>dispatch(messageAction.setMessage({errorMessage:'服务器错误'})))
    };
}

export function initStart() {
    return {
        type : actionTypes.INIT_SWITCH_SHOP_START
    }
}

export function initSuccess(content) {
    return {
        type : actionTypes.INIT_SWITCH_SHOP_SUCCESS,
        content
    }
}