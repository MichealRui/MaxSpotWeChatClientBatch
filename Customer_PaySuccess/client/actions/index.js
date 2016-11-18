/**
 * Created by cabbage on 16/10/2016.
 */

import fetch from 'isomorphic-fetch';

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
        dispatch(initSuccess(PaySuccessData))
    };
}

export function initStart() {
    return {
        type: INIT_START,
    }
}

export function initSuccess(orderlist) {
    return {
        type: INIT_SUCCESS,
        orderlist
    }
}

export function initFail() {
    return {
        type: INIT_FAIL
    }
}





