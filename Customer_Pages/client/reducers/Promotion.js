import * as actionType from '../actionTypes/Promotion';

function initStart(content) {
    return Object.assign({},content);
}

function initSuccess(content,skus) {
    return Object.assign({},content,skus)
}


export default function(content={},action) {
    switch (action.type){
        case actionType.INIT_PROMOTION_START:
            return initStart(content);
            break;
        case actionType.INIT_PROMOTION_SUCCESS:
            return initSuccess(content,action.content);
            break;
        default:
            return content;
    }
}