/**
 * Created by wyf on 2016/10/19.
 */
import {INIT_START, INIT_SUCCESS, INIT_FAIL, SWITCH_SHOP_SUCCESS, SWITCH_SHOP_FAIL} from '../constants/ActionTypes';

const initStates = {
    shopList:[
        {
            id:1,
            current:true,
            shopImg:'',
            shopName:'',
            shopAddress:'',
            shopClass:''
        }
    ]
};
const initState = {
    current:[
        {
            address:"北京市朝阳区光华路9号光华路SOHO2期3Q一层",
            city:1,
            id:1,
            latitude:1,
            longitude:1,
            manager:1,
            name:"光华路SOHO2 3Q",
            province:1,
            region:1,
            remarks:"",
            status:1,
            type:"store",
            warehouse_parent:1
        }
    ],
    others:[
        {
            address:"北京市朝阳区光华路9号光华路SOHO2期3Q一层",
            city:1,
            id:1,
            latitude:1,
            longitude:1,
            manager:1,
            name:"光华路SOHO2 3Q",
            province:1,
            region:1,
            remarks:"",
            status:1,
            type:"store",
            warehouse_parent:1
        }
    ],
    stores:[
        {
            address:"北京市朝阳区光华路9号光华路SOHO2期3Q一层",
            city:1,
            id:1,
            latitude:1,
            longitude:1,
            manager:1,
            name:"光华路SOHO2 3Q",
            province:1,
            region:1,
            remarks:"",
            status:1,
            type:"store",
            warehouse_parent:1
        }
    ]
};

function initStart(state) {
    return Object.assign({},state);
}

function initSuccess(state, content, storeId){
    let current = content.stores.filter(s => {
        return s.id == storeId
    });
    let others = content.stores.filter(s => {
        return s.id != storeId
    });
    return Object.assign({}, {others: others}, {current: current});
}

function initFail(state){
    return Object.assign({}, state, {errorMessage:'init fail'});
}

function switchShopSuccess(state) {
    return Object.assign({},state, {successMessage:'switch shop success'});
}

function switchShopFail(state) {
    return Object.assign({},state, {errorMessage:'switch shop fail'});
}

export default function shopList(state=initState, action) {
    switch (action.type){
        case INIT_START:
            return initStart(state);
        case INIT_SUCCESS:
            return initSuccess(state, action.content, action.storeId);
        case INIT_FAIL:
            return initFail(state);
        case SWITCH_SHOP_SUCCESS:
            return switchShopSuccess(state);
        case SWITCH_SHOP_FAIL:
            return switchShopFail(state);
        default:
            return state;
    }
}