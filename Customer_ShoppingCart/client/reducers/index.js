/**
 * Created by ruibing on 16/8/17.
 */
'use strict';
import { INIT_ERROR, INIT_SUCCESS} from '../actions/actions'
import { TOGGLE_SHOP, CHANGE_SHOP_STATE } from '../actions/actions'
import { CLEAR_CART } from '../actions/actions'
import { ADD_ITEM, DELETE_ITEM, INCREMENT_COUNTER_SUCC, INCREMENT_COUNTER_FAIL, DECREMENT_COUNTER_SUCC, DECREMENT_COUNTER_FAIL} from '../actions/actions'
import {FETCH_ITEM_REQUEST, FETCH_ITEM_RECEIVE, FETCH_ITEM_ERROR} from '../actions/actions'
import { SET_MESSAGE } from '../actions/actions'

function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

function calcuShopSum(itemInfo) {
    let newItemInfo = Object.assign({}, itemInfo);
    newItemInfo.skus.forEach( sku => {
        sku.shopSum = sku.productList.map(
                product => product.count * product.sellprice
            ).reduce(
                (previous, current, index, array) => previous + current
            , 0) / 100
    });
    return newItemInfo;
}

function calcuTotalSum(itemInfo) {

    let filteredSkus = itemInfo.skus.filter(
        sku => {
            let id = sku.id;
            let s = itemInfo.activateShop.filter(
                shop => shop[id].activated && !shop[id].editable
            );
            return s.length != 0
        }
    );
    return filteredSkus.length == 0 ? 0
        : filteredSkus.map(sku => sku.shopSum).reduce((pre, next) => pre + next, 0)

}

function finalState(itemInfo) {
    let calculatedItemInfo = calcuShopSum(itemInfo);
    return Object.assign({}, calculatedItemInfo , {totalMoney: calcuTotalSum(calculatedItemInfo)})
}

function addItem(itemInfo, newItem) {
    let item = Object.assign({}, newItem, {count:1});
    if(isEmptyObject(itemInfo.productList)) {
        return {
            productList: new Array(Object.assign({}, item)),
        }
    } else {
        let newItemInfo = Object.assign({}, itemInfo);
        let isDup = false;
        let isOver = false;
        /* Deal with the dup item*/
        for(let it of newItemInfo.productList) {
            if(it.skuNumber == item.skuNumber) {
                if(it.count < it.quantity) {
                    it.count ++;
                } else {
                    isOver = true
                }
                isDup = true;
                break
            }
        }
        
        //Deal with the limitation
        //todo redesign data structure
        // if(isDup) {
        //     newItemInfo.alertMessage = "不可超过上限"
        // }
        /* Deal with the not dup item*/
        if(!isDup) {
            newItemInfo.productList.push(item)
        }
        return finalState(newItemInfo)
    }
}

function deleteItem(itemInfo, item, shopId) {
    let newItemList = Object.assign({},itemInfo);
    newItemList.skus.map(sku => {
        if(sku.id == shopId){
            let list = sku.productList;
            sku.productList = list.filter(it=>it.skuNumber!=item.skuNumber);
        }
    });
    return finalState(newItemList)
}

function changeCount(itemInfo, skuNumber, shopId, operation) {
    let newItemList = Object.assign({}, itemInfo);
    newItemList.skus.map(sku => {
        if(sku.id == shopId) {
            let list = sku.productList;
            sku.productList = list.map(
                (item) => item.skuNumber==skuNumber ? operation(item):item
            );
        }
    });
    return finalState(newItemList)
}

function increaseCount(itemInfo, item, shopId) {
    return changeCount( itemInfo, item.skuNumber, shopId,
        (i) => {
            if(i.count < i.quantity) {
                i.count ++;
            }
            return i;
        })
}

function failIncrementCount(itemInfo, item, shopId, errorMessage) {
    return Object.assign({}, itemInfo, {errorMessage: errorMessage})
}

function decreaseCount (itemInfo, item, shopId) {
    let LastOne = 1;
    if(item.count <= LastOne) {
        return finalState(Object.assign({}, itemInfo));
        //return deleteItem(Object.assign({}, itemInfo), item, shopId)
    }
    return     changeCount( itemInfo, item.skuNumber, shopId,
        (i) => {
            i.count --;
            return i;
        });
}

function decreaseCountFail(itemInfo, item, shopId, errorMessage) {
    return Object.assign({}, itemInfo, {errorMessage: errorMessage})
}

function fetchItemRequest(itemInfo, skuId) {
    return Object.assign({}, itemInfo, {isItemFetching: true}, {errorMessage: ""}); //used to tell user we are fetching data now
}

function fetchItemReceive(itemInfo, item) {
    let newItemInfo = Object.assign({}, itemInfo, {isItemFetching: false}, {errorMessage: ""});
    return addItem(newItemInfo, item)
}

function fetchItemError(itemInfo) {
    return Object.assign({}, itemInfo, {isItemFetching: false})
}

function setMessage(itemInfo, message) {
    return Object.assign({}, itemInfo, {errorMessage: message})
}

function initSuccess(state, itemInfo) {
    let info = {skus: itemInfo};
    info.activateShop = info.skus.map(sku => {
        let id = sku.id;
        let stores = {};
        stores[id] = {editable: false, activated: true};
        return stores;
    });
    return finalState(info)
}

function toggleShop(itemInfo, shopId) {
    let newItemInfo = Object.assign({}, itemInfo);
    newItemInfo.activateShop = newItemInfo.activateShop.map(
        shop => {
            let id = Object.keys(shop).shift();
            if(id == shopId) {
                let temp = {};
                temp[id] = {
                    editable: shop[id].editable,
                    activated: !shop[id].activated
                };
                return temp
            } else {
                return shop
            }
        });
    return finalState(newItemInfo);
}

function editState(itemInfo, shopId) {
    let newItemInfo = Object.assign({}, itemInfo);
    newItemInfo.activateShop = newItemInfo.activateShop.map(
        shop => {
            let id = Object.keys(shop).shift();
            if(id == shopId) {
                let temp = {};
                temp[id] = {
                    editable: !shop[id].editable,
                    activated: shop[id].activated
                };
                return temp
            } else {
                return shop
            }
        });
    return finalState(newItemInfo);
}

function clearCart(itemInfo) {
    return {skus:[], activateShop:[{1:{editable: false, activated: true}}], remainTime: ''}
}

 export default function (itemInfo = {skus:[], activateShop:[{1:{editable: false, activated: true}}], remainTime: '', errorMessage:''}, action){
    switch(action.type){
        case INIT_SUCCESS:
            return initSuccess(itemInfo, action.skus);
        case TOGGLE_SHOP:
            return toggleShop(itemInfo, action.shopId);
        case CHANGE_SHOP_STATE:
            return editState(itemInfo, action.shopId);
        case CLEAR_CART:
            return clearCart(itemInfo);
        case ADD_ITEM:
            return addItem(itemInfo, action.item);
        case DELETE_ITEM:
            return deleteItem(itemInfo, action.item, action.shopId);
        case INCREMENT_COUNTER_SUCC:
            return increaseCount(itemInfo, action.item, action.shopId);
        case INCREMENT_COUNTER_FAIL:
            return failIncrementCount(itemInfo, action.item, action.shopId, action.errorMessage);
        case DECREMENT_COUNTER_SUCC:
            return decreaseCount(itemInfo, action.item, action.shopId);
        case DECREMENT_COUNTER_FAIL:
            return decreaseCountFail(itemInfo, action.item, action.shopId, action.errorMessage);
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