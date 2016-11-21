/**
 * Created by wyf on 2016/10/19.
 */
import {INIT_START, INIT_SUCCESS, INIT_FAIL, ADD_INTO_CART_SUCCESS, ADD_INTO_CART_FAIL} from '../contants/ActionTypes';

const mock = {
    "brand": {
        "imagePath":"",
        "url":"",
        "id":272,
        "story":"",
        "skuTypeId":0,
        "description":"",
        "name":"多力多滋",
        "sortNumber":0
    },
    productDetail: {
        "maxStock":0,
        "countryName":"中国大陆",
        "uniqueNumber":573,
        "imagePath":'',
        "parentCategory":0,
        "remarks":"",
        "brandName":"多力多滋",
        "id":578,
        "categoryName":"休闲零食",
        "safeStock":0,
        "imageId":437,
        "height":0,
        "msrp":0,
        "name":"多力多滋超浓芝士味玉米片",
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
        "shortName":"芝士味玉米片"
    },
    storeId: '7'};


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
    return Object.assign({}, state, {successMessage:'add into cart success'});
}

function addIntoCartFail(state) {
    return Object.assign({}, state, {errorMessage:'add into cart fail'});
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
        default:
            return state;
    }
}