/**
 * Created by ruibing on 16/10/11.
 */
import {INIT_START ,INIT_SUCCESS, INIT_FAIL} from '../actions/index';
import { INIT_WX_CONFIG_SUCC, INIT_WX_CONFIG_ERR , JSSDK_INITED} from '../actions/index'

let result = {
    "jssdkPayParams":{
        "packageProperty":"",
        "appId":"",
        "timeStamp":"",
        "signType":"",
        "nonceStr":"",
        "paySign":""
    },
    "order":{
        "statusName":"已取消",
        "payTime":"",
        "id":202,
        "parentId":0,
        "wxpayUrl":"",
        "totalPrice":0,
        "cancelUserId":1,
        "cancelTime":"2016-10-29 22:30:00",
        "status":91,
        "payStatusName":"未付款",
        "childOrders":[
            {
                "store":{
                    "region":5,
                    "manager":3,
                    "warehouse_parent":1,
                    "status":1,
                    "remarks":"",
                    "type":"store",
                    "city":9691,
                    "id":7,
                    "address":"",
                    "name":"",
                    "province":2,
                    "longitude":1,
                    "latitude":1
                },
                "statusName":"已取消",
                "payTime":"",
                "id":201,
                "parentId":202,
                "wxpayUrl":"",
                "totalPrice":0,
                "cancelUserId":1,
                "cancelTime":"2016-10-29 23:00:00",
                "status":91,
                "payStatusName":"未付款",
                "isParent":2,
                "takeGoodsNumber":"",
                "warehouseId":7,
                "buyerId":7,
                "payStatus":1,
                "sellerId":0,
                "orderNumber":"",
                "skus":[
                    {
                        "sellPrice":0,
                        "count":0,
                        "sku":{
                        },
                        "sellOrderId":201,
                        "id":241,
                        "skuId":580,
                        "inventoryId":0
                    },
                    {
                        "sellPrice":0,
                        "count":0,
                        "sku":{
                        },
                        "sellOrderId":201,
                        "id":242,
                        "skuId":578,
                        "inventoryId":0
                    },
                    {
                        "sellPrice":0,
                        "count":0,
                        "sku":{
                        },
                        "sellOrderId":201,
                        "id":243,
                        "skuId":579,
                        "inventoryId":0
                    }
                ],
                "requestWxpayTime":"Sat Oct 29 23:17:05 CST 2016",
                "sellTime":"2016-10-29 22:21:55",
                "wxprepayId":"wx2016102923170527ef2ababf0842569286"
            }
        ],
        "isParent":1,
        "takeGoodsNumber":"",
        "warehouseId":0,
        "buyerId":7,
        "payStatus":1,
        "sellerId":0,
        "orderNumber":"",
        "skus":[
        ],
        "sellTime":"2016-10-29 22:21:55",
        "wxprepayId":""
    },
    "is_succ":true
}

function initStart(state) {
    return Object.assign({}, state)
}

function initSuccess(state, updated){
    return Object.assign({}, state, updated, {is_succ: true});
}

function initFail(state) {
    return Object.assign({}, state)
}

function JSSDKInited(state) {
    return Object.assign({}, state, {sdkInited: true})
}

function initWxConfigSucc(state, config) {
    return Object.assign({}, state, {authConfig: config})
}

export default function (
    content={
        orderInfo: result.order,
        wxConfig: result.jssdkPayParams
    }, action) {
    switch (action.type) {
        case INIT_START:
            return initStart(content);
        case INIT_SUCCESS:
            return initSuccess(content, action.content);
        case INIT_FAIL:
            return initFail(content);
        case JSSDK_INITED:
            return JSSDKInited(content);
        case INIT_WX_CONFIG_SUCC:
            return initWxConfigSucc(content, action.config);
        default:
            return content;
    }
}