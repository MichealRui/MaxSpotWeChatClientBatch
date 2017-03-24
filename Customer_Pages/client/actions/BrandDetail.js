import fetch from 'isomorphic-fetch';
import * as actionTypes from '../actionTypes/BrandDetail';
import * as cartAction from './Cart';
import * as messageAction from './Message';

const domain = ENV.domain;

export function initBrand(brandId,storeId) {
    console.log(brandId)
    console.log(storeId)
    return (dispatch) => {
        dispatch(initStart());
        fetch( domain + '/web/buyer_api/brand_detail.ction',
            {
                credentials : 'include',
                method : 'POST',
                mode : 'cors',
                body : JSON.stringify({
                    brandId : brandId, //366
                    storeId : storeId //7
                })
            }).then((response)=>response.json())
            .then(
                json => {
                    console.log(json);
                   if(json.is_succ){
                       dispatch(initSuccess({
                           brand : json.brand,
                           skus : json.skus
                       }));
                       dispatch(cartAction.initCart())
                   }else{
                       dispatch(messageAction.setMessage({errorMessage:json.error_message}))
                   }
                }
            ).catch(e=>dispatch(messageAction.setMessage({errorMessage:'服务器错误'})))
    };
}

export function initStart() {
    return {
        type : actionTypes.INIT_BRAND_START
    }
}

export function initSuccess(content) {
    return {
        type : actionTypes.INIT_BRAND_SUCCESS,
        content
    }
}