/**
 * Created by cabbage on 16/10/2016.
 */

import fetch from 'isomorphic-fetch';

import Util from  '../util/WeChatUtil'

export const INIT_START = 'INIT_START';

export const INIT_SUCCESS = 'INIT_SUCCESS';

export const INIT_FAIL = 'INIT_FAIL';


export function initPaySuccess() {
    let PaySuccessData = {
        order:[
            {
                shopId:1,
                machineAddress:'北京地铁一号线国贸站机器A',
                goodsCode:200876517
            },
            {
                shopId:1,
                machineAddress:'北京地铁一号线国贸站机器B',
                goodsCode:2008768982
            },

            {
                shopId:1,
                machineAddress:'北京地铁一号线国贸站机器A',
                goodsCode:200876438
            },


        ]
    }
    return (dispatch)=>{
        let domain = ENV.domain;
        let order = Util.getUrlParam().ordernumber;
        dispatch(initStart());
        fetch(domain + '/web/buyer_api/order_detail.ction',{
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body:JSON.stringify({
                order_number:order
            })
        }).then(response=>response.json())
            .then(json=>{
                if(json.is_succ){
                    console.log(json);
                    dispatch(initSuccess(json.order));
                }else {
                    dispatch(initFail());
                }
            })
            .catch(e=>{
                console.log(JSON.stringify(e));
            });
    }
}

export function initStart() {
    return {
        type: INIT_START,
    }
}

export function initSuccess(order) {
    return {
        type: INIT_SUCCESS,
        order
    }
}

export function initFail() {
    return {
        type: INIT_FAIL
    }
}





