/**
 * Created by cabbage on 16/10/2016.
 */
'use strict';
import {INIT_START,INIT_SUCCESS,INIT_FAIL} from '../actions/index'

const PaySuccessData = {
    order:[]
}

function initSuccess(orderInfo, order) {
    let newOrders =  Object.assign({},orderInfo);
    newOrders.order.push(order);
    return newOrders
}


export default function (order = PaySuccessData,action) {
    switch (action.type){
        case INIT_SUCCESS:
            return initSuccess(order, action.order);
        default:
            return order;
    }
}