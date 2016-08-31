/**
 * Created by ruibing on 16/6/15.
 */

import fetch from 'isomorphic-fetch'
import WeChatUtil from '../util/WeChatUtil'

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

export function fetchItem(skuId) {
    return (dispatch) =>  {
        dispatch(fetchItemRequest(skuId));
        fetch('http://localhost:9000/fetchItem',
            {
                'method': 'POST',
                'mode': 'cors',
                'cache': 'default',
                'Origin': '*',
                body: JSON.stringify({
                    skuId: skuId,
                    wexinCode: WeChatUtil.getWeXinCode()
                })
            }
        )
        .then(response => response.json())
            .then(json => {
                if(json.status != undefined && json.status == '0') {
                    if(json.item && json.item.skuId == skuId) {
                        dispatch(fetchItemReceive(json.item));
                    } else {
                        dispatch(setMessage('无此商品'));
                        dispatch(fetchItemError(skuId))
                    }
                } else {
                    dispatch(setMessage('服务器错误,请刷新页面或联系商家'));
                    dispatch(fetchItemError(skuId))
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

export function deleteItem(item) {
    return {
        type: DELETE_ITEM,
        item
    }
}

/*导出加一的方法*/
export function increment(item){
    return {
        type:INCREMENT_COUNTER,
        item
    }
}

/*导出减一的方法*/
export function decrement(item){
    return {
        type:DECREMENT_COUNTER,
        item
    }
}

