/**
 * Created by cabbage on 16/10/2016.
 */
import fetch from 'isomorphic-fetch'

import shopImage from '../components/Gallery/images/shop.jpg'


export const INIT_START = 'INIT_START';

export const INIT_SUCCESS = 'INIT_SUCCESS';

export const INIT_FAIL = 'INIT_FAIL';

export const CHANGE_LIKE = 'CHANGE_LIKE';

export function initShopContent() {
    let ShopContent = {
        header : {
            shopImg:shopImage,
            shopName:'光华路SOHO2-3Qdsd',
            like:false,
        },
        info:[
            {
                imagepath:shopImage,
            },
            {
                imagepath:shopImage,
            },
        ],
        gallery : {
            shopAddress:'北京市朝阳区国贸光华路SOHO二期',
            shopTime:'8:00 - 23:00',
            telephone:'672648034',
        }
    }
    return (dispatch)=>{
        dispatch(initSuccess(ShopContent))
    };
}

export function initStart() {
    return {
        type: INIT_START,
    }
}

export function initSuccess(cont) {
    return {
        type: INIT_SUCCESS,
        cont
    }
}

export function initFail() {
    return {
        type: INIT_FAIL
    }
}


export function changeLike(cont) {
    return {
        type:CHANGE_LIKE,
        cont
    }
}



