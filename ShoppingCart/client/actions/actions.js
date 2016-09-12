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

