/**
 * Created by wyf on 2016/10/18.
 */
import fetch from 'isomorphic-fetch';
import Util from '../util/WeChatUtil';
import {INIT_START, INIT_SUCCESS, INIT_FAIL, PICK_UP_START, PICK_UP_SUCCESS, PICK_UP_FAIL} from '../constants/ActionTypes';


export function initOrderDetail(ordernumber) {
    return (dispatch)=>{
        let domain = ENV.domain;
        let order = Util.getUrlParam().order_number;
        dispatch(initStart());
        fetch(domain + '/web/buyer_api/order_detail.ction',{
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body:JSON.stringify({
                order_number:order
            })
        })
            .then(response=>response.json())
            .then(json=>{
                if(json.is_succ){
                    dispatch(initSuccess(json.order));
                }else {
                    dispatch(initFail());
                }
            })
            .catch(e=>{
                console.log(JSON.stringify(e));
            });
    }
}


export function initStart() {
    return {
        type:INIT_START
    };
}

export function initSuccess(order) {
    return {
        type:INIT_SUCCESS,
        order
    };
}

export function initFail() {
    return {
        type:INIT_FAIL
    };
}

export function pickUp(order_id) {
    return (dispatch)=>{
        console.log(order_id);
        dispatch(pickUpStart());
        fetch('http://www.baidu.com',{
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body:JSON.stringify({
                orderId:order_id
            })
        })
            .then(response=>response.json())
            .then(json=>{
                if(json.is_succ){
                    dispatch(pickUpSuccess());
                }else {
                    dispatch(pickUpFail());
                }
            })
            .catch((e)=>{console.log(e)});
    };
}

export function pickUpStart() {
    return {
        type:PICK_UP_START
    };
}

export function pickUpSuccess() {
    return {
        type:PICK_UP_SUCCESS
    };
}

export function pickUpFail() {
    return {
        type:PICK_UP_FAIL
    };
}
