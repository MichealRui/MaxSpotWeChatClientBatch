/**
 * Created by ruibing on 16/10/11.
 */
import fetch from 'isomorphic-fetch'

export const INIT_START = 'INIT_START';

export const INIT_SUCCESS = 'INIT_SUCCESS';

export const INIT_FAIL = 'INIT_FAIL';

export  const JSSDK_INITED = 'JS_SDK_INIT';

export const INIT_WX_CONFIG = 'INIT_WX_CONFIG';

export const INIT_WX_CONFIG_ERR = 'INIT_WX_CONFIG_ERR';

export const INIT_WX_CONFIG_SUCC = 'INIT_WX_CONFIG_SUCC';

const domain  = 'http://114.215.143.97';

export function initWXConfig() {
    return (dispatch) => {
        fetch( domain + '/web/buyer_api/get_jsapi_config_params.ction',
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({url: 'http://www.mjitech.com/'})
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
        dispatch(initStart())
        fetch( domain + '/web/buyer_api/get_jsapi_pay_params.ction',
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify({
                    order_number : 'SO20161031175147001'
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
    }
    // const mockWXconfig = {
    //     timestamp: '20161010',
    //     nonceStr: 'asdadscwertfwerqwdasd',
    //     signature: 'asdwerqwedfiuqwoperue',
    //     prepay_id: '9012348j123',
    //     paySign: 'asdqwqwe1231sdf2423rsdf'
    // };
    // const mockOrderInfo = {
    //     remainTime:'14分58秒',
    //     productItems:[
    //         {
    //             orderAddress:'北京地铁一号线国贸站机器A',
    //             orderDetailProductList:[
    //                 {
    //                     productImg:'./mycomponent/productItemImg.png',
    //                     productName:'Gokuri',
    //                     productDesc:'桃味果汁饮料500ml',
    //                     productTaste:'番茄口味',
    //                     unitPrice:'20',
    //                     quantity:'1',
    //                     amount:'20'
    //                 },
    //                 {
    //                     productImg:'./mycomponent/productItemImg.png',
    //                     productName:'Gokuri',
    //                     productDesc:'桃味果汁饮料500ml',
    //                     productTaste:'番茄口味',
    //                     unitPrice:'20',
    //                     quantity:'1',
    //                     amount:'20'
    //                 }
    //             ],
    //             discount:0,
    //             totalCount:2,
    //             totalMoney:90
    //         },
    //         {
    //             orderAddress:'北京地铁一号线国贸站机器B',
    //             orderDetailProductList:[
    //                 {
    //                     productImg:'./mycomponent/productItemImg.png',
    //                     productName:'Gokuri',
    //                     productDesc:'桃味果汁饮料500ml',
    //                     productTaste:'番茄口味',
    //                     unitPrice:'20',
    //                     quantity:'1',
    //                     amount:'20'
    //                 }
    //             ],
    //             discount:-15,
    //             totalCount:2,
    //             totalMoney:90
    //         }
    //     ],
    //     actualMoney:200,
    //     productDiscount:-18,
    //     limitDiscount:-10,
    //     totalMoney:172
    // }


    // let result = {
    //     "jssdkPayParams":{
    //         "packageProperty":"prepay_id=wx2016102923390368ef4ebf460166572587",
    //         "appId":"wx4da5ecd6305e620a",
    //         "timeStamp":"1477755543",
    //         "signType":"MD5",
    //         "nonceStr":"8tyx736wqje3nma3t92fczurm7tqk8",
    //         "paySign":"01D842753DB102B2F008E9B4DE0AFC77"
    //     },
    //     "order":{
    //         "statusName":"已取消",
    //         "payTime":"",
    //         "id":202,
    //         "parentId":0,
    //         "wxpayUrl":"",
    //         "totalPrice":5800,
    //         "cancelUserId":1,
    //         "cancelTime":"2016-10-29 22:30:00",
    //         "status":91,
    //         "payStatusName":"未付款",
    //         "childOrders":[
    //             {
    //                 "store":{
    //                     "region":5,
    //                     "manager":3,
    //                     "warehouse_parent":1,
    //                     "status":1,
    //                     "remarks":"",
    //                     "type":"store",
    //                     "city":9691,
    //                     "id":7,
    //                     "address":"北京市朝阳区光华路9号光华路SOHO2期3Q一层",
    //                     "name":"光华路SOHO2 3Q",
    //                     "province":2,
    //                     "longitude":1,
    //                     "latitude":1
    //                 },
    //                 "statusName":"已取消",
    //                 "payTime":"",
    //                 "id":201,
    //                 "parentId":202,
    //                 "wxpayUrl":"",
    //                 "totalPrice":5800,
    //                 "cancelUserId":1,
    //                 "cancelTime":"2016-10-29 23:00:00",
    //                 "status":91,
    //                 "payStatusName":"未付款",
    //                 "isParent":2,
    //                 "takeGoodsNumber":"",
    //                 "warehouseId":7,
    //                 "buyerId":7,
    //                 "payStatus":1,
    //                 "sellerId":0,
    //                 "orderNumber":"SO20161029222154001",
    //                 "skus":[
    //                     {
    //                         "sellPrice":1160,
    //                         "count":1,
    //                         "sku":{
    //                             "maxStock":0,
    //                             "countryName":"中国大陆",
    //                             "uniqueNumber":577,
    //                             "imagePath":"/static/sku/0/0/580/1474369264761.jpg",
    //                             "parentCategory":0,
    //                             "remarks":"",
    //                             "brandName":"多力多滋",
    //                             "id":580,
    //                             "categoryName":"休闲零食",
    //                             "safeStock":0,
    //                             "imageId":439,
    //                             "height":0,
    //                             "msrp":0,
    //                             "name":"多力多滋烟熏烧烤味玉米片",
    //                             "length":0,
    //                             "tags":"",
    //                             "publishTime":"Tue Sep 20 19:01:20 CST 2016",
    //                             "status":2,
    //                             "width":0,
    //                             "barcode":"4710543613600",
    //                             "country":1,
    //                             "expirationDays":0,
    //                             "unit":"",
    //                             "category":6,
    //                             "minStock":0,
    //                             "skuNumber":"UF000580",
    //                             "brand":272,
    //                             "shortName":"烟熏烧烤味"
    //                         },
    //                         "sellOrderId":201,
    //                         "id":241,
    //                         "skuId":580,
    //                         "inventoryId":0
    //                     },
    //                     {
    //                         "sellPrice":1160,
    //                         "count":2,
    //                         "sku":{
    //                             "maxStock":0,
    //                             "countryName":"中国大陆",
    //                             "uniqueNumber":573,
    //                             "imagePath":"/static/sku/0/0/578/1474368794745.jpg",
    //                             "parentCategory":0,
    //                             "remarks":"",
    //                             "brandName":"多力多滋",
    //                             "id":578,
    //                             "categoryName":"休闲零食",
    //                             "safeStock":0,
    //                             "imageId":437,
    //                             "height":0,
    //                             "msrp":0,
    //                             "name":"多力多滋超浓芝士味玉米片",
    //                             "length":0,
    //                             "tags":"",
    //                             "publishTime":"Tue Sep 20 18:53:22 CST 2016",
    //                             "status":2,
    //                             "width":0,
    //                             "barcode":"4710543613501",
    //                             "country":1,
    //                             "expirationDays":0,
    //                             "unit":"",
    //                             "category":6,
    //                             "minStock":0,
    //                             "skuNumber":"UF000578",
    //                             "brand":272,
    //                             "shortName":"芝士味玉米片"
    //                         },
    //                         "sellOrderId":201,
    //                         "id":242,
    //                         "skuId":578,
    //                         "inventoryId":0
    //                     },
    //                     {
    //                         "sellPrice":1160,
    //                         "count":2,
    //                         "sku":{
    //                             "maxStock":0,
    //                             "countryName":"中国大陆",
    //                             "uniqueNumber":576,
    //                             "imagePath":"/static/sku/0/0/579/1474369127460.jpg",
    //                             "parentCategory":0,
    //                             "remarks":"",
    //                             "brandName":"多力多滋",
    //                             "id":579,
    //                             "categoryName":"休闲零食",
    //                             "safeStock":0,
    //                             "imageId":438,
    //                             "height":0,
    //                             "msrp":0,
    //                             "name":"多力多滋夜电美式辣鸡翅味",
    //                             "length":0,
    //                             "tags":"",
    //                             "publishTime":"Tue Sep 20 18:59:06 CST 2016",
    //                             "status":2,
    //                             "width":0,
    //                             "barcode":"4710543000349",
    //                             "country":1,
    //                             "expirationDays":0,
    //                             "unit":"",
    //                             "category":6,
    //                             "minStock":0,
    //                             "skuNumber":"UF000579",
    //                             "brand":272,
    //                             "shortName":"夜电美式辣鸡翅味"
    //                         },
    //                         "sellOrderId":201,
    //                         "id":243,
    //                         "skuId":579,
    //                         "inventoryId":0
    //                     }
    //                 ],
    //                 "requestWxpayTime":"Sat Oct 29 23:17:05 CST 2016",
    //                 "sellTime":"2016-10-29 22:21:55",
    //                 "wxprepayId":"wx2016102923170527ef2ababf0842569286"
    //             }
    //         ],
    //         "isParent":1,
    //         "takeGoodsNumber":"",
    //         "warehouseId":0,
    //         "buyerId":7,
    //         "payStatus":1,
    //         "sellerId":0,
    //         "orderNumber":"SO20161029222154002",
    //         "skus":[
    //         ],
    //         "sellTime":"2016-10-29 22:21:55",
    //         "wxprepayId":""
    //     },
    //     "is_succ":true
    // }



    return {
        type: INIT_SUCCESS,
        content: {
            orderInfo: result.order,
            wxConfig: result.jssdkPayParams
        }
    }
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