import * as actionTypes from '../actionTypes/ShopDetail';

function initStart(content) {
    return Object.assign({},content);
}

function initSuccess(content,data) {
    return Object.assign({},content,data);
}

export default function (content={},action) {
    switch (action.type){
        case actionTypes.INIT_SHOP_DETAIL_START:
            return initStart(content);
        case actionTypes.INIT_SHOP_DETAIL_SUCCESS:
            return initSuccess(content,action.content);
        default:
            return content;
    }
}