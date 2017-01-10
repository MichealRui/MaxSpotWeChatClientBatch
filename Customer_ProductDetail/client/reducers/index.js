/**
 * Created by wyf on 2016/10/19.
 */
import {INIT_START, INIT_SUCCESS, INIT_FAIL, ADD_INTO_CART_SUCCESS, ADD_INTO_CART_FAIL} from '../contants/ActionTypes';
import {INIT_CART_FAIL,INIT_CART_SUCC} from '../contants/ActionTypes';
import {INIT_WX_SUCC, INIT_WX_FAIL, JSSDK_INITED} from '../contants/ActionTypes'

const mock = {
    "brand": {
        "imagePath":"",
        "url":"",
        "id":272,
        "story":"",
        "skuTypeId":0,
        "description":"",
        "name":"",
        "sortNumber":0
    },
    productDetail: {
        "maxStock":0,
        "countryName":"",
        "uniqueNumber":573,
        "imagePath":'',
        "parentCategory":0,
        "remarks":"",
        "brandName":"",
        "id":578,
        "categoryName":"",
        "safeStock":0,
        "imageId":437,
        "height":0,
        "msrp":0,
        "name":"",
        "length":0,"quantity":0,
        "sellprice":0,
        "tags":"",
        "publishTime":"Tue Sep 20 18:53:22 CST 2016",
        "status":2,
        "width":0,
        "barcode":"4710543613501",
        "country":1,
        "expirationDays":0,
        "unit":"",
        "category":6,
        "minStock":0,
        "skuNumber":"UF000578",
        "brand":272,
        "images": [
            ""
        ],
        "attributes":[
            {"unit":"","name":"口味","value":"芝士"},
            {"unit":"g","name":"净含量","value":"65"}
            ],
        "shortName":""
    },
    storeId: '7',
    total:0,
    wxConfig : {
        timestamp: '',
        noncestr: '',
        sign: '',
    },
    sdkInited:false
};


function initStart(state) {
    return Object.assign({},state);
}

function initSuccess(state, content){
    return Object.assign({}, state, content);
}

function initFail(state){
    return Object.assign({}, state, {errorMessage:'init fail'});
}

function addIntoCartSuccess(state) {
    state.total ++ ;
    return Object.assign({}, state, {successMessage:'add into cart success'});
}

function addIntoCartFail(state) {
    return Object.assign({}, state, {errorMessage:'add into cart fail'});
}

function initCartFail(state) {
    return Object.assign({},state,{errorMessage:'init cart fail'});
}

function initCart(state,cart) {
    return Object.assign({},state,{total:cart.count});
}

function initWxConfigSucc(state, config) {
    return Object.assign({}, state, { wxConfig: config })
}

function JSSDKInited(state) {
    return Object.assign({}, state, {sdkInited: true})
}

export default function productDetail(state=mock, action) {
    switch (action.type){
        case INIT_START:
            return initStart(state);
        case INIT_SUCCESS:
            return initSuccess(state, action.content);
        case INIT_FAIL:
            return initFail(state);
        case ADD_INTO_CART_SUCCESS:
            return addIntoCartSuccess(state);
        case ADD_INTO_CART_FAIL:
            return addIntoCartFail(state);
        case INIT_CART_FAIL:
            return initCartFail(state);
        case INIT_CART_SUCC:
            return initCart(state,action.cart);
        case INIT_WX_SUCC:
            return initWxConfigSucc(state, action.config);
        case JSSDK_INITED:
            return JSSDKInited(state);
        default:
            return state;
    }
}