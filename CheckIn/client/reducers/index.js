/**
 * Created by ruibing on 16/8/17.
 */
'use strict';
import { ADD_ITEM, DELETE_ITEM, INCREMENT_COUNTER, DECREMENT_COUNTER} from '../actions/actions'
import {FETCH_ITEM_REQUEST, FETCH_ITEM_RECEIVE, FETCH_ITEM_ERROR} from '../actions/actions'
import { SET_MESSAGE } from '../actions/actions'

function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

function calcuSum(itemInfo) {
    if(itemInfo.productList.length == 0) return 0;
    return itemInfo.productList
        .map((product) => product.count * product.productCost)
        .reduce((previous, current, index, array) => previous + current)
}

function finalState(itemInfo) {
    return Object.assign({}, itemInfo, {totalMoney: calcuSum(itemInfo)})
}

function addItem(itemInfo, item) {
    if(isEmptyObject(itemInfo)) {
        return {
            productList: new Array(item),
        }
    } else {
        let newItemInfo = Object.assign({}, itemInfo);
        let isDup = false;
        /* Deal with the dup item*/
        for(let it of newItemInfo.productList) {
            if(it.skuId ==  item.skuId) {
                it.count ++;
                isDup = true;
                break;
            }
        }
        /* Deal with the not dup item*/
        if(!isDup) {
            newItemInfo.productList.push(item)
        }
        return finalState(newItemInfo)
    }
}

function deleteItem(itemInfo, item) {
    let newItemList = Object.assign({},itemInfo);
    let list = itemInfo.productList;
    let skuId = item.skuId;
    newItemList.productList = list.filter(it=>it.skuId!=skuId);
    return finalState(newItemList)
}

function changeCount(itemInfo, skuId, operation) {
    let newItemList = Object.assign({}, itemInfo);
    let list = newItemList.productList;
    newItemList.productList = list.map(
        (item) => item.skuId==skuId ? operation(item):item
    );
    return finalState(newItemList)
}

function increaseCount(itemInfo, item) {
    return changeCount( itemInfo, item.skuId,
        (i) => {
            i.count ++;
            return i;
        })
}

function decreaseCount (itemInfo, item) {
    let LastOne = 1;
    if(item.count <= LastOne) {
        return deleteItem(Object.assign({}, itemInfo), item)
    }
    return     changeCount( itemInfo, item.skuId,
        (i) => {
            i.count --;
            return i;
        });
}

function fetchItemRequest(itemInfo, skuId) {
    return Object.assign({}, itemInfo, {isItemFetching: true}, {alertMessage: ""}); //used to tell user we are fetching data now
}

function fetchItemReceive(itemInfo, item) {
    let newItemInfo = Object.assign({}, itemInfo, {isItemFetching: false}, {alertMessage: ""});
    return addItem(newItemInfo, item)
}

function fetchItemError(itemInfo) {
    return Object.assign({}, itemInfo, {isItemFetching: false})
}

function setMessage(itemInfo, message) {
    return Object.assign({}, itemInfo, {alertMessage: message})
}

 export default function (itemInfo = {productList:[]}, action){
    switch(action.type){
        case ADD_ITEM:
            return addItem(itemInfo, action.item);
        case DELETE_ITEM:
            return deleteItem(itemInfo, action.item);
        case INCREMENT_COUNTER:
            return increaseCount(itemInfo, action.item);
        case DECREMENT_COUNTER:
            return decreaseCount(itemInfo, action.item);
        case FETCH_ITEM_REQUEST:
            return fetchItemRequest(itemInfo, action.skuId);
        case FETCH_ITEM_RECEIVE:
            return fetchItemReceive(itemInfo, action.item);
        case FETCH_ITEM_ERROR:
            return fetchItemError(itemInfo, action.skuId, action.message);
        case SET_MESSAGE:
            return setMessage(itemInfo, action.message);
        default:
            return itemInfo;
    }
}