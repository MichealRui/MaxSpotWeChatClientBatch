/**
 * Created by ruibing on 16/10/11.
 */
import fetch from 'isomorphic-fetch'

import Util from '../util/WeChatUtil'

export const INIT_START = 'INIT_START';

export const INIT_SUCCESS = 'INIT_SUCCESS';

export const INIT_FAIL = 'INIT_FAIL';

export  const JSSDK_INITED = 'JS_SDK_INIT';

export const INIT_WX_CONFIG = 'INIT_WX_CONFIG';

export const INIT_WX_CONFIG_ERR = 'INIT_WX_CONFIG_ERR';

export const INIT_WX_CONFIG_SUCC = 'INIT_WX_CONFIG_SUCC';

const domain  = ENV.domain;

export function initWXConfig() {
    console.log(window.location.href);
    return (dispatch) => {
        fetch( domain + '/web/buyer_api/get_jsapi_config_params.action',
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({url: window.location.href})
            }).then (response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(initWxConfigSucc(json.params))
                    dispatch(initPageContent())
                } else {
                    dispatch(initWxConfigErr(json.error_message))
                }
            })
    }
}

export function initWxConfigSucc(config) {
    return {
        type: INIT_WX_CONFIG_SUCC,
        config
    }
}

export function initWxConfigErr() {
    return {
        type: INIT_WX_CONFIG_ERR
    }
}

export function initPageContent() {
    return (dispatch) => {
        dispatch(initStart());
        let order = Util.getUrlParam().ordernumber;
        fetch( domain + '/web/buyer_api/get_jsapi_pay_params.ction',
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify({
                    order_number : order
                })
            }
        ).then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(initSuccess(
                        {
                            orderInfo: json.order,
                            wxConfig: json.jssdkPayParams
                        }
                    ))
                } else {
                    dispatch(initFail())
                }
            })
    };
    // let result = {"jssdkPayParams":{"appId":"wx4da5ecd6305e620a","timeStamp":"1486441991","signType":"MD5","package":"prepay_id=null","nonceStr":"sgto19ffge1k86tcq0vsxnvnf78hai","paySign":"D6264CB4721BE296EADC67C7425E4C39"},"order":{"store":{"region":5,"phone":"12345678","manager":1,"status":1,"imagePath":"static//warehouse/0/0/12/1486438244312.jpg","warehouse_parent":1,"remarks":"","type":"machine","city":9691,"id":12,"imageId":0,"address":"测试地址","name":"测试门店","province":2,"images":["static//warehouse/0/0/12/1486438244312.jpg"],"longitude":1,"latitude":1,"openingTime":"0:00-24:00"},"statusName":"已下单","payTime":"","id":1198,"refundUserId":0,"parentId":0,"wxpayUrl":"weixin://wxpay/bizpayurl?pr=e8dnvaa","totalPrice":1,"cancelUserId":0,"cancelTime":"","status":1,"payStatusName":"未付款","isParent":2,"takeGoodsNumber":"","warehouseId":12,"buyerId":1,"payStatus":1,"sellerId":7,"orderNumber":"SO20170207123127001","skus":[{"sellPrice":1,"count":1,"sku":{"maxStock":200,"countryName":"日本","uniqueNumber":1,"shelfThickness":0,"imagePath":"/static/sku/0/0/1/1471329318964.jpg","parentCategory":0,"shelfWidth":0,"remarks":"","brandName":"Knoppers","id":1,"categoryName":"智趣玩具","title":"Mr.Lonely单身狗公仔(男)","safeStock":170,"specunit":43,"imageId":12,"height":0,"msrp":0,"description":"","name":"Mr.Lonely单身狗公仔(男)","shelfHeight":0,"length":0,"tags":"","status":3,"width":0,"barcode":"123456","country":5860,"expirationDays":0,"unit":"个","category":20,"minStock":10,"skuNumber":"UH000001","images":["/static/sku/0/0/1/1471325083136.PNG","/static/sku/0/0/1/1471325142592.JPG","/static/sku/0/0/1/1471329318964.jpg"],"brand":320,"shortName":"单身狗公仔玩偶(男)"},"sellOrderId":1198,"id":1237,"skuId":1,"inventoryId":0}],"requestWxpayTime":"Tue Feb 07 12:31:28 CST 2017","sellTime":"2017-02-07 12:31:28","wxprepayId":"wx2017020712312704b5d4c5a90911270780"},"shopName":"测试门店","is_succ":true}
    //
    // return {
    //     type: INIT_SUCCESS,
    //     content: {
    //         orderInfo: result.order,
    //         wxConfig: result.jssdkPayParams
    //     }
    // }
}

export function initSdk() {
    return {
        type: JSSDK_INITED
    }
}

export function initStart() {
    return {
        type: INIT_START
    }
}

export function initSuccess(content) {
    return {
        type: INIT_SUCCESS,
        content
    }
}

export function initFail() {
    return {
        type: INIT_FAIL
    }
}