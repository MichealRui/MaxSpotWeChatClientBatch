import * as actionTypes from '../actionTypes/OrderDetail';

function initStart(content) {
    return Object.assign({},content);
}

function initSuccess(content,data) {
    return Object.assign({},content,{order:data});
}

export default function (content={},action) {
    switch (action.type){
        case actionTypes.INIT_ORDERDETAIL_START:
            return initStart(content);
        case actionTypes.INIT_ORDERDETAIL_SUCCESS:
            return initSuccess(content,action.content);
        default:
            return content;
    }
}