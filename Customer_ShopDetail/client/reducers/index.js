/**
 * Created by cabbage on 16/10/2016.
 */
'use strict';
import {INIT_START,INIT_SUCCESS,INIT_FAIL} from '../actions/index'
import {CHANGE_LIKE} from '../actions/index'

const defaultState = {
    header : {
        shopImg:"",
        shopName:"",
        like:false,
    },
    gallery:[
        '',
        '',
        '',
        ''
    ],
    info : {
        shopAddress:"",
        shopTime:"",
        telephone:"",
    }
};

const mock = {
    "store":{
        "region":5,
        "manager":3,
        "warehouse_parent":1,
        "status":1,
        "remarks":"",
        "type":"store",
        "city":9691,
        "id":7,
        "address":"北京市朝阳区光华路9号光华路SOHO2期3Q一层",
        "name":"光华路SOHO2 3Q",
        "province":2,
        "images":[
        ],
        "longitude":1,
        "latitude":1
    }
}

function initSucc(itemInfos, item) {
    let header = {
        shopImg: item.images[0],
        shopName: item.name,
        like: false
    };
    let gallery = item.images;
    let info = {
        shopAddress:item.address,
        shopTime: '9:00 - 22:00',
        telephone: ''
    };
    return Object.assign({}, {header: header}, {gallery: defaultState.gallery}, {info: info}, {store: item})
    // return Object.assign({},itemInfos, item);
}

function changeLike(itemInfo) {
    let newItem = Object.assign({},itemInfo);
    newItem.header.like = !newItem.header.like;
    return finalState(newItem);
}

function finalState(itemInfo) {
    return Object.assign({},itemInfo);
}

export default function (itemInfos = defaultState,action) {
    switch (action.type){
        case INIT_SUCCESS:
            return initSucc(itemInfos, action.cont);
        case CHANGE_LIKE:
            return changeLike(itemInfos);
        default:
            return itemInfos;
    }
}