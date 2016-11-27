/**
 * Created by wyf on 2016/10/18.
 */
import fetch from 'isomorphic-fetch';
import Util from '../util/WeChatUtil';
import {INIT_START, INIT_SUCCESS, INIT_FAIL, PICK_UP_START, PICK_UP_SUCCESS, PICK_UP_FAIL} from '../constants/ActionTypes';

const mock = {
    "order":{
        "store":{
            "region":5,
            "phone":"010-52800122",
            "manager":3,
            "imagePath":"static//warehouse/0/0/7//soho3q.jpg",
            "warehouse_parent":1,
            "status":1,
            "remarks":"",
            "type":"store",
            "city":9691,
            "id":7,
            "address":"北京市朝阳区光华路9号光华路SOHO2期3Q一层",
            "name":"光华路SOHO2 3Q",
            "province":2,
            "images":[
                "static//warehouse/0/0/7//soho3q.jpg"
            ],
            "longitude":1,
            "latitude":1,
            "openingTime":"08:00-21:00"
        },
        "statusName":"已取消",
        "payTime":"",
        "id":179,
        "parentId":0,
        "wxpayUrl":"",
        "totalPrice":4000,
        "cancelUserId":1,
        "cancelTime":"2016-10-25 14:15:00",
        "status":91,
        "payStatusName":"未付款",
        "isParent":0,
        "takeGoodsNumber":"",
        "warehouseId":7,
        "buyerId":22,
        "payStatus":1,
        "sellerId":0,
        "orderNumber":"SO20161025140210001",
        "skus":[
            {
                "sellPrice":1680,
                "count":1,
                "sku":{
                    "maxStock":0,
                    "countryName":"泰国",
                    "uniqueNumber":580,
                    "shelfThickness":0,
                    "imagePath":"/static/sku/0/0/584/56384.jpg",
                    "parentCategory":0,
                    "shelfWidth":0,
                    "remarks":"",
                    "brandName":"小老板",
                    "id":584,
                    "categoryName":"休闲零食",
                    "title":"小老板烤海苔卷（辣椒味）",
                    "safeStock":0,
                    "height":0,
                    "imageId":810,
                    "msrp":0,
                    "description":"",
                    "name":"小老板烤海苔卷（辣椒味）",
                    "shelfHeight":0,
                    "length":0,
                    "tags":"",
                    "publishTime":"Tue Sep 20 21:20:40 CST 2016",
                    "status":2,
                    "width":0,
                    "barcode":"8858702410854",
                    "country":6163,
                    "expirationDays":0,
                    "unit":"",
                    "category":6,
                    "minStock":0,
                    "skuNumber":"UF000584",
                    "images":[
                        "/static/sku/0/0/584/56384.jpg",
                        "/static/sku/0/0/584/74553.jpg"
                    ],
                    "brand":340,
                    "shortName":"小老板烤海苔卷"
                },
                "sellOrderId":179,
                "id":207,
                "skuId":584,
                "inventoryId":0
            },
            {
                "sellPrice":1160,
                "count":1,
                "sku":{
                    "maxStock":0,
                    "countryName":"中国大陆",
                    "uniqueNumber":578,
                    "shelfThickness":0,
                    "imagePath":"/static/sku/0/0/578/59476.jpg",
                    "parentCategory":0,
                    "shelfWidth":0,
                    "remarks":"",
                    "brandName":"多力多滋",
                    "id":578,
                    "categoryName":"休闲零食",
                    "title":"浓郁芝士冲击味蕾",
                    "safeStock":0,
                    "height":24,
                    "imageId":799,
                    "msrp":0,
                    "description":"Doritos源自于西班牙文，有“一小块黄金”之意。超浓芝士味玉米片有着爆炸性的酥脆，超浓郁的口味，彻底征服你的味蕾。无油烘焙玉米片，百分百健康。将玉米片与香浓的起士以慢火微烤，浓厚的乳香配合玉米的香甜，每一口都是前所未有的美味震撼冲击你的味蕾。",
                    "name":"超浓芝士味玉米片",
                    "shelfHeight":0,
                    "length":19,
                    "tags":"",
                    "publishTime":"Tue Sep 20 18:53:22 CST 2016",
                    "status":2,
                    "width":6,
                    "barcode":"4710543613501",
                    "country":1,
                    "expirationDays":0,
                    "unit":"袋",
                    "category":6,
                    "minStock":0,
                    "skuNumber":"UF000578",
                    "images":[
                        "/static/sku/0/0/578/59476.jpg",
                        "/static/sku/0/0/578/64625.jpg",
                        "/static/sku/0/0/578/69491.jpg"
                    ],
                    "brand":272,
                    "shortName":"芝士味玉米片"
                },
                "sellOrderId":179,
                "id":208,
                "skuId":578,
                "inventoryId":0
            },
            {
                "sellPrice":1160,
                "count":1,
                "sku":{
                    "maxStock":0,
                    "countryName":"中国大陆",
                    "uniqueNumber":576,
                    "shelfThickness":0,
                    "imagePath":"/static/sku/0/0/579/69434.jpg",
                    "parentCategory":0,
                    "shelfWidth":0,
                    "remarks":"",
                    "brandName":"多力多滋",
                    "id":579,
                    "categoryName":"休闲零食",
                    "title":"多力多滋夜电美式辣鸡翅味",
                    "safeStock":0,
                    "height":0,
                    "imageId":802,
                    "msrp":0,
                    "description":"",
                    "name":"多力多滋夜电美式辣鸡翅味",
                    "shelfHeight":0,
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
                    "images":[
                        "/static/sku/0/0/579/69434.jpg",
                        "/static/sku/0/0/579/47183.jpg",
                        "/static/sku/0/0/579/99465.jpg"
                    ],
                    "brand":272,
                    "shortName":"夜电美式辣鸡翅味"
                },
                "sellOrderId":179,
                "id":209,
                "skuId":579,
                "inventoryId":0
            }
        ],
        "sellTime":"2016-10-25 14:02:11",
        "wxprepayId":""
    },
    "is_succ":true
}


export function initOrderDetail(ordernumber) {
    // return (dispatch)=>{
    //     let domain = ENV.domain;
    //     let order = Util.getUrlParam().order_number;
    //     dispatch(initStart());
    //     fetch(domain + '/web/buyer_api/order_detail.ction',{
    //         credentials: 'include',
    //         method: 'POST',
    //         mode: 'cors',
    //         body:JSON.stringify({
    //             order_number:order
    //         })
    //     })
    //         .then(response=>response.json())
    //         .then(json=>{
    //             if(json.is_succ){
    //                 dispatch(initSuccess(json.orders));
    //             }else {
    //                 dispatch(initFail());
    //             }
    //         })
    //         .catch(e=>{
    //             console.log(JSON.stringify(e));
    //         });
    // }
    return (dispatch) => {
        dispatch(initSuccess(mock.order))
    }
}


export function initStart() {
    return {
        type:INIT_START
    };
}

export function initSuccess(order) {
    return {
        type:INIT_SUCCESS,
        order
    };
}

export function initFail() {
    return {
        type:INIT_FAIL
    };
}

export function pickUp(order_id) {
    return (dispatch)=>{
        console.log(order_id);
        dispatch(pickUpStart());
        fetch('http://www.baidu.com',{
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body:JSON.stringify({
                orderId:order_id
            })
        })
            .then(response=>response.json())
            .then(json=>{
                if(json.is_succ){
                    dispatch(pickUpSuccess());
                }else {
                    dispatch(pickUpFail());
                }
            })
            .catch((e)=>{console.log(e)});
    };
}

export function pickUpStart() {
    return {
        type:PICK_UP_START
    };
}

export function pickUpSuccess() {
    return {
        type:PICK_UP_SUCCESS
    };
}

export function pickUpFail() {
    return {
        type:PICK_UP_FAIL
    };
}
