/**
 * Created by cabbage on 16/10/2016.
 */
import fetch from 'isomorphic-fetch'

import Util from '../util/WeChatUtil'

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
        gallery:[
            {
                imagepath1:shopImage,
                imagepath2:shopImage,
            },
            {
                imagepath1:shopImage,
                imagepath2:shopImage,
            },
            {
                imagepath1:shopImage,
                imagepath2:shopImage,
            },
        ],
        info : {
            shopAddress:'北京市朝阳区国贸光华路SOHO',
            shopTime:'8:00 - 23:00',
            telephone:'672648034',
        }
    }
    return (dispatch)=>{
        let domain = ENV.domain;
        let storeid = Util.getUrlParam().storeid;
        fetch( domain + '/web/buyer_api/store_detail.action',
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    storeId: storeid
                })
            }
        ).then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(initSuccess(json.store))
                } else {
                    dispatch(initFail())
                }
            }).catch(e => { dispatch(initFail()) })

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



