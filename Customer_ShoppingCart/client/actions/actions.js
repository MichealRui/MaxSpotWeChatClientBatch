/**
 * Created by ruibing on 16/6/15.
 */

import fetch from 'isomorphic-fetch'

/* init shopping cart*/
export const INIT_SHOPPING_CART = 'INIT_SHOPPING_CART';
export const INIT_ERROR = 'INIT_ERROR';
export const INIT_SUCCESS = 'INIT_SUCCESS';
export const TOGGLE_SHOP = 'TOGGLE_SHOP';
export const CHANGE_SHOP_STATE = 'CHANGE_SHOP_STATE';
export const CLEAR_CART = 'CLEAR_CART';

export const INCREMENT_COUNTER_SUCC = 'INCREMENT_COUNTER_SUCC';
export const INCREMENT_COUNTER_FAIL = 'INCREMENT_COUNTER_FAIL';

export const DECREMENT_COUNTER_SUCC = 'DECREMENT_COUNTER_SUCC';
export const DECREMENT_COUNTER_FAIL = 'DECREMENT_COUNTER_FAILA';

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_ITEM_FAIL = 'DELETE_ITEM_FAIL';

/* fetch item ASYNC action*/
export const FETCH_ITEM_REQUEST = 'FETCH_ITEM_REQUEST';
export const FETCH_ITEM_RECEIVE = 'FETCH_ITEM_RECEIVE';
export const FETCH_ITEM_ERROR = 'FETCH_ITEM_ERROR';

/* set Message content*/
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_METION_MESSAGE = 'SET_METION_MESSAGE';

const domain = ENV.domain;

const mock = {
    "skus": [
        {
            "region": 5,
            "phone": "010-52800122",
            "manager": 3,
            "recommends": [
                {
                    "maxStock": 0,
                    "countryName": "韩国",
                    "uniqueNumber": 497,
                    "shelfThickness": 7,
                    "imagePath": "/static/sku/0/0/497/1482828436235.jpg",
                    "statusName": "在售",
                    "parentCategory": 0,
                    "shelfWidth": 5,
                    "remarks": "",
                    "brandName": "Amore 爱茉莉",
                    "id": 497,
                    "categoryName": "个人护理",
                    "title": "拒绝做\u201c毛躁\u201d美人",
                    "safeStock": 0,
                    "specunit": 37,
                    "imageId": 1305,
                    "height": 15,
                    "msrp": 5900,
                    "description": "爱茉莉护发精油其中含有的摩洛哥阿甘油能够补充多种营养，消除头发静电，修复头发创伤面，含有的蜂胶成分有效修复受损发质，调理头发湿度，为秀发生长提供充足养分。玫瑰花纯露让秀发散发出迷人的淡淡花香。",
                    "name": "柔顺防毛躁护发精油",
                    "shelfHeight": 15,
                    "length": 7,
                    "quantity": 7,
                    "sellprice": 5000,
                    "tags": "",
                    "publishTime": "Thu Sep 01 19:14:19 CST 2016",
                    "status": 1,
                    "width": 5,
                    "barcode": "123456",
                    "country": 4306,
                    "expirationDays": 0,
                    "unit": "瓶",
                    "category": 17,
                    "minStock": 0,
                    "skuNumber": "UH000497",
                    "images": [
                        "/static/sku/0/0/497/1482828436235.jpg",
                        "/static/sku/0/0/497/1484448524647.jpg",
                        "/static/sku/0/0/497/1482828436671.jpg",
                        "/static/sku/0/0/497/1482828437075.jpg"
                    ],
                    "brand": 62,
                    "attributes": [
                        {
                            "unit": "g",
                            "name": "净含量",
                            "value": ""
                        },
                        {
                            "unit": "",
                            "name": "尺寸",
                            "value": ""
                        },
                        {
                            "unit": "枚",
                            "name": "包装规格",
                            "value": ""
                        }
                    ],
                    "shortName": "柔顺防毛躁护发精油"
                },
                {
                    "maxStock": 0,
                    "countryName": "韩国",
                    "uniqueNumber": 473,
                    "shelfThickness": 90,
                    "imagePath": "/static/sku/0/0/473/1482828309670.jpg",
                    "statusName": "在售",
                    "parentCategory": 0,
                    "shelfWidth": 90,
                    "remarks": "",
                    "brandName": "Banilaco 芭妮兰",
                    "id": 473,
                    "categoryName": "基础护肤",
                    "title": "韩国口碑卸妆膏",
                    "safeStock": 0,
                    "specunit": 29,
                    "imageId": 1300,
                    "height": 70,
                    "msrp": 11900,
                    "description": "卸妆是比保养还重要的事情，妆容卸不干净可能会\u201c毁容\u201c，但是通常的卸妆产品使用起来并不是很快捷。这款韩国热销的卸妆膏能够在3分钟卸除，即便再浓重的妆容也能速速搞定。其中的木瓜和樱桃萃取物，能够深层去除毛孔污垢和彩妆，很好地解决了卸妆水残留与卸妆油堵塞毛孔烦恼，使用后滋润肌肤，不干燥不油腻。",
                    "name": "热销款卸妆膏",
                    "shelfHeight": 70,
                    "length": 90,
                    "quantity": 12,
                    "sellprice": 10100,
                    "tags": "",
                    "status": 1,
                    "width": 90,
                    "barcode": "8809248493832 ",
                    "country": 4306,
                    "expirationDays": 0,
                    "unit": "盒",
                    "category": 13,
                    "minStock": 0,
                    "skuNumber": "UC000473",
                    "images": [
                        "/static/sku/0/0/473/1482828309670.jpg",
                        "/static/sku/0/0/473/1482828312015.jpg",
                        "/static/sku/0/0/473/1484048344315.jpg"
                    ],
                    "brand": 321,
                    "attributes": [
                        {
                            "unit": "",
                            "name": "颜色",
                            "value": ""
                        },
                        {
                            "unit": "g",
                            "name": "净含量",
                            "value": ""
                        }
                    ],
                    "shortName": "热销款卸妆膏"
                }
            ],
            "status": 1,
            "imagePath": "static//warehouse/0/0/7//soho3q.jpg",
            "warehouse_parent": 1,
            "productList": [
                {
                    "maxStock": 0,
                    "countryName": "韩国",
                    "uniqueNumber": 495,
                    "count": 5,
                    "shelfThickness": 60,
                    "imagePath": "/static/sku/0/0/495/1482828239694.jpg",
                    "statusName": "在售",
                    "parentCategory": 0,
                    "shelfWidth": 70,
                    "remarks": "",
                    "brandName": "LG",
                    "id": 495,
                    "categoryName": "个人护理",
                    "title": "洗护合一适合懒人",
                    "safeStock": 0,
                    "specunit": 37,
                    "imageId": 1297,
                    "height": 240,
                    "msrp": 7500,
                    "description": "ReEn润膏无硅洗护合一洗发水是LG集团顶级护发品牌ReEn的明星产品，它不含硅油，不会造成脱发问题。更重要的是，它是洗护合一的产品，太适合懒人了。如果你烦恼洗完头发再涂抹护发素，就试试这款吧，一次都解决了真好。",
                    "name": "润膏洗发护发合一",
                    "shelfHeight": 240,
                    "length": 70,
                    "quantity": 2,
                    "sellprice": 6400,
                    "tags": "",
                    "publishTime": "Thu Sep 01 18:58:48 CST 2016",
                    "status": 1,
                    "width": 60,
                    "barcode": "8801051154436 ",
                    "country": 4306,
                    "expirationDays": 1080,
                    "unit": "个",
                    "category": 17,
                    "minStock": 0,
                    "skuNumber": "UH000495",
                    "images": [
                        "/static/sku/0/0/495/1482828239694.jpg",
                        "/static/sku/0/0/495/1482828239939.jpg",
                        "/static/sku/0/0/495/1482828240230.jpg"
                    ],
                    "brand": 146,
                    "attributes": [
                        {
                            "unit": "g",
                            "name": "净含量",
                            "value": ""
                        },
                        {
                            "unit": "",
                            "name": "尺寸",
                            "value": ""
                        },
                        {
                            "unit": "枚",
                            "name": "包装规格",
                            "value": ""
                        }
                    ],
                    "shortName": "ReEn润膏洗发护发合一"
                },
                {
                    "maxStock": 0,
                    "countryName": "日本",
                    "uniqueNumber": 154,
                    "count": 3,
                    "shelfThickness": 40,
                    "imagePath": "/static/sku/0/0/154/1482827768983.jpg",
                    "statusName": "在售",
                    "parentCategory": 0,
                    "shelfWidth": 160,
                    "remarks": "",
                    "brandName": "Unicharm 尤妮佳",
                    "id": 154,
                    "categoryName": "个人护理",
                    "title": "质地顺滑超级省水",
                    "safeStock": 0,
                    "specunit": 96,
                    "imageId": 1280,
                    "height": 140,
                    "msrp": 2500,
                    "description": "尤妮佳苏菲的这款化妆棉锁水能力很强，只需要我们一般使用化妆水的二分之一用量。水感海绵，可以使化妆水百分百渗透到你的肌肤，让皮肤水水嫩嫩，吹弹可破，让化妆水不再浪费。",
                    "name": "绵柔易吸收化妆棉",
                    "shelfHeight": 140,
                    "length": 160,
                    "quantity": 6,
                    "sellprice": 2100,
                    "tags": "",
                    "status": 1,
                    "width": 40,
                    "barcode": "4903111478064",
                    "country": 5860,
                    "expirationDays": 1080,
                    "unit": "盒",
                    "category": 17,
                    "minStock": 0,
                    "skuNumber": "UH000154",
                    "images": [
                        "/static/sku/0/0/154/1482827768983.jpg",
                        "/static/sku/0/0/154/1482827810563.jpg",
                        "/static/sku/0/0/154/1482827815159.jpg"
                    ],
                    "brand": 87,
                    "attributes": [
                        {
                            "unit": "g",
                            "name": "净含量",
                            "value": ""
                        },
                        {
                            "unit": "",
                            "name": "尺寸",
                            "value": ""
                        },
                        {
                            "unit": "枚",
                            "name": "包装规格",
                            "value": "12"
                        }
                    ],
                    "shortName": "绵柔易吸收化妆棉"
                },
                {
                    "maxStock": 0,
                    "countryName": "韩国",
                    "uniqueNumber": 497,
                    "count": 1,
                    "shelfThickness": 7,
                    "imagePath": "/static/sku/0/0/497/1482828436235.jpg",
                    "statusName": "在售",
                    "parentCategory": 0,
                    "shelfWidth": 5,
                    "remarks": "",
                    "brandName": "Amore 爱茉莉",
                    "id": 497,
                    "categoryName": "个人护理",
                    "title": "拒绝做\u201c毛躁\u201d美人",
                    "safeStock": 0,
                    "specunit": 37,
                    "imageId": 1305,
                    "height": 15,
                    "msrp": 5900,
                    "description": "爱茉莉护发精油其中含有的摩洛哥阿甘油能够补充多种营养，消除头发静电，修复头发创伤面，含有的蜂胶成分有效修复受损发质，调理头发湿度，为秀发生长提供充足养分。玫瑰花纯露让秀发散发出迷人的淡淡花香。",
                    "name": "柔顺防毛躁护发精油",
                    "shelfHeight": 15,
                    "length": 7,
                    "quantity": 7,
                    "sellprice": 5000,
                    "tags": "",
                    "publishTime": "Thu Sep 01 19:14:19 CST 2016",
                    "status": 0,
                    "width": 5,
                    "barcode": "123456",
                    "country": 4306,
                    "expirationDays": 0,
                    "unit": "瓶",
                    "category": 17,
                    "minStock": 0,
                    "skuNumber": "UH000497",
                    "images": [
                        "/static/sku/0/0/497/1482828436235.jpg",
                        "/static/sku/0/0/497/1484448524647.jpg",
                        "/static/sku/0/0/497/1482828436671.jpg",
                        "/static/sku/0/0/497/1482828437075.jpg"
                    ],
                    "brand": 62,
                    "attributes": [
                        {
                            "unit": "g",
                            "name": "净含量",
                            "value": ""
                        },
                        {
                            "unit": "",
                            "name": "尺寸",
                            "value": ""
                        },
                        {
                            "unit": "枚",
                            "name": "包装规格",
                            "value": ""
                        }
                    ],
                    "shortName": "柔顺防毛躁护发精油"
                },
                {
                    "maxStock": 0,
                    "countryName": "韩国",
                    "uniqueNumber": 473,
                    "count": 2,
                    "shelfThickness": 90,
                    "imagePath": "/static/sku/0/0/473/1482828309670.jpg",
                    "statusName": "在售",
                    "parentCategory": 0,
                    "shelfWidth": 90,
                    "remarks": "",
                    "brandName": "Banilaco 芭妮兰",
                    "id": 473,
                    "categoryName": "基础护肤",
                    "title": "韩国口碑卸妆膏",
                    "safeStock": 0,
                    "specunit": 29,
                    "imageId": 1300,
                    "height": 70,
                    "msrp": 11900,
                    "description": "卸妆是比保养还重要的事情，妆容卸不干净可能会\u201c毁容\u201c，但是通常的卸妆产品使用起来并不是很快捷。这款韩国热销的卸妆膏能够在3分钟卸除，即便再浓重的妆容也能速速搞定。其中的木瓜和樱桃萃取物，能够深层去除毛孔污垢和彩妆，很好地解决了卸妆水残留与卸妆油堵塞毛孔烦恼，使用后滋润肌肤，不干燥不油腻。",
                    "name": "热销款卸妆膏",
                    "shelfHeight": 70,
                    "length": 90,
                    "quantity": 0,
                    "sellprice": 10100,
                    "tags": "",
                    "status": 1,
                    "width": 90,
                    "barcode": "8809248493832 ",
                    "country": 4306,
                    "expirationDays": 0,
                    "unit": "盒",
                    "category": 13,
                    "minStock": 0,
                    "skuNumber": "UC000473",
                    "images": [
                        "/static/sku/0/0/473/1482828309670.jpg",
                        "/static/sku/0/0/473/1482828312015.jpg",
                        "/static/sku/0/0/473/1484048344315.jpg"
                    ],
                    "brand": 321,
                    "attributes": [
                        {
                            "unit": "",
                            "name": "颜色",
                            "value": ""
                        },
                        {
                            "unit": "g",
                            "name": "净含量",
                            "value": ""
                        }
                    ],
                    "shortName": "热销款卸妆膏"
                }
            ],
            "remarks": "",
            "type": "store",
            "city": 9691,
            "id": 7,
            "imageId": 0,
            "address": "北京市朝阳区光华路9号光华路SOHO2期3Q一层",
            "name": "光华路SOHO2 3Q",
            "province": 2,
            "images": [
                "static//warehouse/0/0/7//soho3q.jpg"
            ],
            "longitude": 1,
            "latitude": 1,
            "openingTime": "08:00-21:00"
        }
    ],
    "is_succ": true
}


export function initShoppingCart() {
    // return (dispatch) => {
    //     if (mock.is_succ) {
    //         dispatch(initSuccess(mock.skus));
    //     } else {
    //         dispatch(setMessage({errorMessage: 'error'}));
    //         dispatch(initError());
    //     }
    // }


    return (dispatch) => {
        fetch(domain + '/web/buyer_api/get_cart.ction',
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
            }
        ).then(response => response.json())
            .then(json => {
                if (json.is_succ) {
                    dispatch(initSuccess(json.skus))
                } else {
                    dispatch(setMessage({errorMessage: json.error_message}));
                    dispatch(initError())
                }
            })
    }
}

export function initSuccess(skus) {
    return {
        type: INIT_SUCCESS,
        skus
    }
}

export function initError() {
    return {
        type: INIT_ERROR
    }
}

export function toggleShop(shopId) {
    return {
        type: TOGGLE_SHOP,
        shopId
    }
}


export function changeShopState(shopId) {
    return {
        type: CHANGE_SHOP_STATE,
        shopId
    }
}

export function clearCart() {
    return {
        type: CLEAR_CART
    }
}

export function fetchItem(skuNumber) {
    console.log('skuNumber ' + skuNumber);
    return (dispatch) => {
        dispatch(fetchItemRequest(skuNumber));
        fetch(domain + '/web/seller_api/wx_get_sku_detail.action',//'http://localhost:9000/fetchitem',
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    open_id: '123456',
                    sku_number: skuNumber,
                })
            }
        )
            .then(response => response.json())
            .then(json => {
                console.log(json)
                if (json.is_succ) {
                    if (json.sku && json.sku.skuNumber == skuNumber) {
                        dispatch(fetchItemReceive(json.sku));
                    } else {
                        dispatch(setMessage({errorMessage: json.error_message}));
                        dispatch(fetchItemError(skuNumber))
                    }
                } else {
                    dispatch(setMessage({errorMessage: json.error_message}));
                    dispatch(fetchItemError(skuNumber))
                }
            }).catch(e => dispatch(setMessage({errorMessage: '服务器异常'})))
    }
}

function fetchItemRequest(skuId) {
    return {
        type: FETCH_ITEM_REQUEST,
        skuId
    }
}

function fetchItemReceive(item) {
    return {
        type: FETCH_ITEM_RECEIVE,
        item,
    }
}

function fetchItemError(skuId) {

    return {
        type: FETCH_ITEM_ERROR,
        skuId: skuId
    }
}

export function setMessage(message) {
    return {
        type: SET_MESSAGE,
        message
    }
}

export function setMetionMessage(message) {
    return {
        type : SET_METION_MESSAGE,
        message
    }
}

export function addItem(item) {
    return {
        type: ADD_ITEM,
        item
    }
}

export function deleteItem(shopId, item) {

    return (dispatch) => {
        fetch(domain + '/web/buyer_api/remove_sku_from_cart.action', {
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                storeId: '' + shopId,
                skuId: '' + item.id,
                count: '' + item.count
            })
        }).then(response => response.json())
            .then(json => {
                if (json.is_succ) {
                    dispatch(succDelete(shopId, item))
                } else {
                    dispatch(failDelete(shopId, item, json.error_message))
                }
            }).catch(e => dispatch(failDelete(shopId, item, '服务器异常')))
    };
}

function succDelete(shopId, item) {
    return {
        type: DELETE_ITEM,
        item,
        shopId
    }
}

function failDelete(shopId, item, error) {
    return {
        type: DELETE_ITEM_FAIL,
        item,
        shopId,
        errorMessage: error
    }
}

/*导出加一的方法*/
export function increment(shopId, item) {
    return (dispatch) => {
        fetch(domain + '/web/buyer_api/add_sku_to_cart.action', {
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                storeId: '' + shopId,
                skuId: '' + item.id,
                count: '1' //+ (parseInt(item.count) + 1)
            })
        }).then(response => response.json())
            .then(json => {
                console.log('increase');
                console.log(json);
                if (json.is_succ) {
                    dispatch(succIncrement(shopId, item))
                } else {
                    dispatch(failIncrement(shopId, item, json.error_message,json.err_code))
                }
            }).catch(e => dispatch(failIncrement(shopId, item, '服务器异常')))
    };
}

function succIncrement(shopId, item) {
    return {
        type: INCREMENT_COUNTER_SUCC,
        item,
        shopId
    }
}

function failIncrement(shopId, item, error , err_code) {
    return {
        type: INCREMENT_COUNTER_FAIL,
        item,
        shopId,
        errorMessage: error,
        errCode:err_code
    }
}

/*导出减一的方法*/
export function decrement(shopId, item) {

    return (dispatch) => {
        fetch(domain + '/web/buyer_api/remove_sku_from_cart.action', {
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                storeId: '' + shopId,
                skuId: '' + item.id,
                count: "1"
            })
        }).then(response => response.json())
            .then(json => {
                if (json.is_succ) {
                    dispatch(succDecrement(shopId, item))
                } else {
                    dispatch(failDecrement(shopId, item, json.error_message))
                }
            }).catch(e => dispatch(failDecrement(shopId, item, '服务器异常')))
    };
}

function succDecrement(shopId, item) {
    return {
        type: DECREMENT_COUNTER_SUCC,
        item,
        shopId
    }
}

function failDecrement(shopId, item, error) {
    return {
        type: DECREMENT_COUNTER_FAIL,
        item,
        shopId,
        errorMessage: error
    }
}


