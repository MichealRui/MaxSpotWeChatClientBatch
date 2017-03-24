import * as actionTypes from '../actionTypes/SwitchShop';

function initStart(content) {
    return Object.assign({},content);
}

function initSuccess(content,data) {
    let storeList = data.shopList;
    let currentStore = storeList.filter(
        s => {
            return s.id == data.currentShopId
        }
    );
    let otherStore = storeList.filter(
        s => {
            return s.id != data.currentShopId
        }
    )
    return Object.assign({},content,{current:currentStore},{others:otherStore});
}

export default function (content={},action) {
    switch (action.type){
        case actionTypes.INIT_SWITCH_SHOP_START:
            return initStart(content);
        case actionTypes.INIT_SWITCH_SHOP_SUCCESS:
            return initSuccess(content,action.content);
        default:
            return content;
    }
}