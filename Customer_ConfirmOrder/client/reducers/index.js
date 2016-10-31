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
        "totalPrice":5800,
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
                    "address":"北京市朝阳区光华路9号光华路SOHO2期3Q一层",
                    "name":"光华路SOHO2 3Q",
                    "province":2,
                    "longitude":1,
                    "latitude":1
                },
                "statusName":"已取消",
                "payTime":"",
                "id":201,
                "parentId":202,
                "wxpayUrl":"",
                "totalPrice":5800,
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
                "orderNumber":"SO20161029222154001",
                "skus":[
                    {
                        "sellPrice":1160,
                        "count":1,
                        "sku":{
                            "maxStock":0,
                            "countryName":"中国大陆",
                            "uniqueNumber":577,
                            "imagePath":"/static/sku/0/0/580/1474369264761.jpg",
                            "parentCategory":0,
                            "remarks":"",
                            "brandName":"多力多滋",
                            "id":580,
                            "categoryName":"休闲零食",
                            "safeStock":0,
                            "imageId":439,
                            "height":0,
                            "msrp":0,
                            "name":"多力多滋烟熏烧烤味玉米片",
                            "length":0,
                            "tags":"",
                            "publishTime":"Tue Sep 20 19:01:20 CST 2016",
                            "status":2,
                            "width":0,
                            "barcode":"4710543613600",
                            "country":1,
                            "expirationDays":0,
                            "unit":"",
                            "category":6,
                            "minStock":0,
                            "skuNumber":"UF000580",
                            "brand":272,
                            "shortName":"烟熏烧烤味"
                        },
                        "sellOrderId":201,
                        "id":241,
                        "skuId":580,
                        "inventoryId":0
                    },
                    {
                        "sellPrice":1160,
                        "count":2,
                        "sku":{
                            "maxStock":0,
                            "countryName":"中国大陆",
                            "uniqueNumber":573,
                            "imagePath":"/static/sku/0/0/578/1474368794745.jpg",
                            "parentCategory":0,
                            "remarks":"",
                            "brandName":"多力多滋",
                            "id":578,
                            "categoryName":"休闲零食",
                            "safeStock":0,
                            "imageId":437,
                            "height":0,
                            "msrp":0,
                            "name":"多力多滋超浓芝士味玉米片",
                            "length":0,
                            "tags":"",
                            "publishTime":"Tue Sep 20 18:53:22 CST 2016",
                            "status":2,
                            "width":0,
                            "barcode":"4710543613501",
                            "country":1,
                            "expirationDays":0,
                            "unit":"",
                            "category":6,
                            "minStock":0,
                            "skuNumber":"UF000578",
                            "brand":272,
                            "shortName":"芝士味玉米片"
                        },
                        "sellOrderId":201,
                        "id":242,
                        "skuId":578,
                        "inventoryId":0
                    },
                    {
                        "sellPrice":1160,
                        "count":2,
                        "sku":{
                            "maxStock":0,
                            "countryName":"中国大陆",
                            "uniqueNumber":576,
                            "imagePath":"/static/sku/0/0/579/1474369127460.jpg",
                            "parentCategory":0,
                            "remarks":"",
                            "brandName":"多力多滋",
                            "id":579,
                            "categoryName":"休闲零食",
                            "safeStock":0,
                            "imageId":438,
                            "height":0,
                            "msrp":0,
                            "name":"多力多滋夜电美式辣鸡翅味",
                            "length":0,
                            "tags":"",
                            "publishTime":"Tue Sep 20 18:59:06 CST 2016",
                            "status":2,
                            "width":0,
                            "barcode":"4710543000349",
                            "country":1,
                            "expirationDays":0,
                            "unit":"",
                            "category":6,
                            "minStock":0,
                            "skuNumber":"UF000579",
                            "brand":272,
                            "shortName":"夜电美式辣鸡翅味"
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
        "orderNumber":"SO20161029222154002",
        "skus":[
        ],
        "sellTime":"2016-10-29 22:21:55",
        "wxprepayId":""
    },
    "is_succ":true
}


const defaultContent = {
    orderInfo: {
        remainTime:'',
        productItems:[],
        actualMoney:'',
        productDiscount:'',
        limitDiscount:'',
        totalMoney:''
    },
    wxConfig: {
        timestamp: '',
        nonceStr: '',
        signature: '',
    }
};

function initStart(state) {
    return Object.assign({}, state)
}

function initSuccess(state, updated){
    return Object.assign({}, state, updated);
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