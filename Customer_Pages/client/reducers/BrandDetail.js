import * as actionTypes from '../actionTypes/BrandDetail';

function initStart(content) {
    return Object.assign({},content);
}

function initSuccess(content,data) {
    console.log('success')
    return Object.assign({},content,data);
}

export default function (content={},action) {
    switch (action.type){
        case actionTypes.INIT_BRAND_START:
            return initStart(content);
        case actionTypes.INIT_BRAND_SUCCESS:
            return initSuccess(content,action.content);
        default:
            return content;
    }
}