/**
 * Created by wyf on 2016/10/18.
 */
import fetch from 'isomorphic-fetch';
import {INIT_START, INIT_SUCCESS, INIT_FAIL, PICK_UP_START, PICK_UP_SUCCESS, PICK_UP_FAIL} from '../constants/ActionTypes';


export function initOrderDetail(order_id) {
    return (dispatch)=>{
        dispatch(initStart());
        fetch('',{
            method:'POST',
            mode:'cors',
            Origin:'*',
            body:JSON.stringify({
                order_id:order_id
            })
        })
            .then(response=>response.json())
            .then(json=>{
                if(json.is_succ){
                    dispatch(initSuccess(json.orderDetail));
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

export function initSuccess(content) {
    return {
        type:INIT_SUCCESS,
        content
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
        fetch('',{
            method:'POST',
            mode:'cors',
            Origin:'*',
            body:JSON.stringify({
                order_id:order_id
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
            .catch((e)=>{console.log(JSON.stringify(e))});
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
