/**
 * Created by cabbage on 16/10/2016.
 */
'use strict';
import * as actionTypes from '../actionTypes/AfterPay'

function initSuccess(content, item) {
    console.log("++++++");
    console.log(item);
    return Object.assign({},content, item);
}

function dealOrderInfo(order,currentKey) {
    let orderBatch = order.batches ? order.batches : [];
    const ORDER_NORMAL = 5; //出货完成  绿色对勾 fa-check
    const ORDER_WRONG = 6 ; //出货异常  红色叹号 fa-exclamation
    const ORDER_WILLOUT = 3; //尚未出货
    const ORDER_ALREADYOUT = 7; //已经出货
    const ORDER_OUTING = 4; //正在出货 红色三个点 fa-ellipsis-h
    let orderItem;
    if(orderBatch && orderBatch.length > 0){
        orderItem = orderBatch.map((order,index)=>{
            let skusImg = order.skus.map((sku,index)=>{
                return sku.sku.imagePath;
            });
            let status = order.outStatus;
            if(index < currentKey){
                status = 7;
            }
            return {
                status : order.outStatus,
                id : index,
                images : skusImg
            }
        })
    }else{
        orderItem = [];
    }

    return orderItem;

}

function initStart(content) {
    return Object.assign({},content);
}

function addlike(iteminfo) {
    let state = Object.assign({},iteminfo)
    state.count ++ ;
    return state;
}

var AfterPayData = {
    ori_state : "1",
    count : 0
};

export default function (content={},action) {
    switch (action.type){
        case actionTypes.INIT_AFTERPAY_START:
            return initStart(content);
        case actionTypes.INIT_AFTERPAY_SUCCESS:
            return initSuccess(content,action.cont);
        default:
            return content;
    }
}