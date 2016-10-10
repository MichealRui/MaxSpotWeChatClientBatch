/**
 * Created by ruibing on 16/6/15.
 */

import fetch from 'isomorphic-fetch'

/* init shopping cart*/
export const INIT_SHOPPING_CART = 'INIT_SHOPPING_CART';
export const INIT_ERROR = 'INIT_ERROR';
export const INIT_SUCCESS = 'INIT_SUCCESS';
export const TOGGLE_SHOP = 'TOGGLE_SHOP';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

/* fetch item ASYNC action*/
export const FETCH_ITEM_REQUEST = 'FETCH_ITEM_REQUEST';
export const FETCH_ITEM_RECEIVE = 'FETCH_ITEM_RECEIVE';
export const FETCH_ITEM_ERROR = 'FETCH_ITEM_ERROR';

/* set Message content*/
export const SET_MESSAGE = 'SET_MESSAGE';


export function initShoppingCart() {

    let shoppingCartData = {

        skus :[
            {
                shopId:1,
                machineAddress:'北京地铁一号线国贸站机器A',
                statusText:'完成',
                productList:[
                    {
                        skuNumber:'23323',
                        imagePath:'./client/components/ProductItem/ProductInfo/images/productImg.jpg',
                        brandName:'Jingle Bells',
                        name:'超级好吃的薯片60g',
                        categoryName:'番茄口味',
                        sellprice:80,
                        count:1,
                        quantity: 10
                    },
                    {
                        skuNumber:'UH000001',
                        imagePath:'./client/components/ProductItem/ProductInfo/images/productImg.jpg',
                        brandName:'Jingle Bells',
                        name:'超级好吃的薯片60g',
                        categoryName:'番茄口味',
                        sellprice:80,
                        count:1,
                        quantity: 10
                    },
                ]
            },
            {
                shopId:2,
                machineAddress:'北京地铁一号线国贸站机器B',
                statusText:'完成',
                productList:[
                    {
                        skuNumber:'23323',
                        imagePath:'./client/components/ProductItem/ProductInfo/images/productImg.jpg',
                        brandName:'Jingle Bells',
                        name:'超级好吃的薯片60g',
                        categoryName:'番茄口味',
                        sellprice:80,
                        count:1,
                        quantity: 10
                    },
                    {
                        skuNumber:'UH000001',
                        imagePath:'./client/components/ProductItem/ProductInfo/images/productImg.jpg',
                        brandName:'Jingle Bells',
                        name:'超级好吃的薯片60g',
                        categoryName:'番茄口味',
                        sellprice:80,
                        count:1,
                        quantity: 10
                    },
                ]
            }
        ],
        logo:'./client/components/TopBar/images/MaxSpot.png',

    };
    return (dispatch) => {
        dispatch(initSuccess(shoppingCartData))
    };

    // (dispatch) => {
    //     dispatch(initRequest());
    //     fetch('',
    //         {
    //             method: 'POST',
    //             mode: 'cors',
    //             Origin: '*',
    //             body: JSON.stringify({
    //                 open_id: '123456'
    //             })
    //         }
    //     ).then(response => response.json())
    //         .then(json => {
    //             if(json.is_succ) {
    //                 dispatch(initSuccess(json.skus))
    //             } else {
    //                 dispatch(setMessage(json.error_message))
    //                 dispatch(initError())
    //             }
    //         })
    // }
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

export function fetchItem(skuNumber) {
    return (dispatch) =>  {
        dispatch(fetchItemRequest(skuNumber));
        fetch( 'http://www.mjitech.com/web/seller_api/wx_get_sku_detail.action',//'http://localhost:9000/fetchitem',
                {
                    method: 'POST',
                    mode: 'cors',
                    Origin: '*',
                    body: JSON.stringify({
                        open_id: '123456',
                        sku_number: skuNumber,
                    })
                }
        )
        .then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    if(json.sku && json.sku.skuNumber == skuNumber) {
                        dispatch(fetchItemReceive(json.sku));
                    } else {
                        dispatch(setMessage(json.error_message));
                        dispatch(fetchItemError(skuNumber))
                    }
                } else {
                    dispatch(setMessage(json.error_message));
                    dispatch(fetchItemError(skuNumber))
                }
            })
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

export function addItem(item) {
    return {
        type: ADD_ITEM,
        item
	}
}

export function deleteItem(shopId, item) {
    return {
        type: DELETE_ITEM,
        item,
        shopId
    }
}

/*导出加一的方法*/
export function increment(shopId, item){
    return {
        type:INCREMENT_COUNTER,
        item,
        shopId
    }
}

/*导出减一的方法*/
export function decrement(shopId, item){
    return {
        type:DECREMENT_COUNTER,
        item,
        shopId
    }
}

