/**
 * Created by cabbage on 16/10/2016.
 */
'use strict';
import * as actionTypes from '../actionTypes/BannerDetail'

function initStart(content) {
    return Object.assign({},content);
}

function initSuccess(content,data) {
    return Object.assign({},content,data);
}

export default function (content={},action) {
    switch (action.type){
        case actionTypes.INIT_BANNERDETAIL_START :
            return initStart(content);
        case actionTypes.INIT_BANNERDETAIL_SUCCESS:
            return initSuccess(content,action.content);
        default:
            return content;
    }
}