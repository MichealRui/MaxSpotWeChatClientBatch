/**
 * Created by wyf on 2016/10/18.
 */
import {INIT_START, INIT_SUCCESS, INIT_FAIL, PICK_UP_START, PICK_UP_SUCCESS, PICK_UP_FAIL} from '../constants/ActionTypes';

const initState={
        orderAddress:'北京地铁一号线国贸站机器A',
        orderStatus:'已完成',
        orderStatusClass:'orderComplete',
        orderNumber:'190019000',
        orderDate:'2016-06-12 15:30',
        orderContactMobile:'62256880',
        orderLastDate:'2016-06-12 15:30',
        orderDetailProductList:[
            {
                productImg:'./mycomponent/productItemImg.png',
                productName:'Gokuri',
                productDesc:'桃味果汁饮料500ml',
                productTaste:'番茄口味',
                unitPrice:'20',
                quantity:'1',
                amount:'20'
            },
            {
                productImg:'./mycomponent/productItemImg.png',
                productName:'Gokuri',
                productDesc:'桃味果汁饮料500ml',
                productTaste:'番茄口味',
                unitPrice:'20',
                quantity:'1',
                amount:'20'
            },
            {
                productImg:'./mycomponent/productItemImg.png',
                productName:'Gokuri',
                productDesc:'桃味果汁饮料500ml',
                productTaste:'番茄口味',
                unitPrice:'20',
                quantity:'1',
                amount:'20'
            }
        ],
        totalMoney:172
    };

function initStart(state) {
    return Object.assign({},state);
}

function initSuccess(state, content){
    return Object.assign(state, content);
}

function initFail(state){
    return Object.assign(state, {errorMessage:'init fail'});
}

function pickUpStart(state) {
    return Object.assign({}, state);
}

function pickUpSuccess(state) {
    return Object.assign({},state, {successMessage:'pick up success'});
}

function pickUpFail(state) {
    return Object.assign({},state, {errorMessage:'pick up fail'});
}

export default function orderDetail(state=initState, action){
    switch(action.type){
        case INIT_START:
            return initStart(state);
        case INIT_SUCCESS:
            return initSuccess(state, action.content);
        case INIT_FAIL:
            return initFail(state);
        case PICK_UP_START:
            return pickUpStart(state);
        case PICK_UP_SUCCESS:
            return pickUpSuccess(state);
        case PICK_UP_FAIL:
            return pickUpFail(state);
        default:
            return state;
    }}
