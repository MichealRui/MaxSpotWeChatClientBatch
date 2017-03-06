import fetch from 'isomorphic-fetch';
import * as actionTypes from '../actionTypes/ProductDetail';
import * as cartAction from './Cart';
import * as messageAction from './Message';

const domain = ENV.domain;

export function initProductDetailByGeo(skuNumber,geo) {
    return (dispatch) => {
        fetch( domain + '/web/buyer_api/get_store_by_geo.action',
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    longitude: geo.latitude,
                    latitude: geo.latitude
                })
            }
        ).then(response=>(response.json())
            .then( json => {
                if(json.is_succ){
                    dispatch(initProductDetail(skuNumber,json.store.id))
                }else{
                    dispatch(messageAction.setMessage({errorMessage:json.error_message}))
                }
            }).catch(e => dispatch(messageAction.setMessage({ errorMessage : '服务器错误'})))

        )
    }
}

export function initProductDetail(skuNumber, storeId) {
    return (dispatch)=>{
        dispatch(initStart());
        fetch( domain + '/web/buyer_api/sku_detail.ction',
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body:JSON.stringify({
                    sku_number: skuNumber,//'UF000578',
                    storeId: storeId
                })
            }
        ).then(response => response.json())
            .then(json => {
                if(json.is_succ){
                    dispatch(
                        initSuccess(
                            Object.assign({},{product:json.sku},{brand:json.brand},{storeId:'7'})
                        )
                    );
                }else{
                    dispatch(messageAction.setMessage({errorMessage:json.err_message}))
                }
            }).catch((e)=>dispatch(messageAction.setMessage({errorMessage:'服务器错误'})));
        dispatch(cartAction.initCart());
    }
}

export  function initStart() {
    return {
        type:actionTypes.INIT_PRODUCT_START
    }
}

export function initSuccess(content) {
    return {
        type:actionTypes.INIT_PRODUCT_SUCCESS,
        content
    }
}

