/**
 * Created by wyf on 2016/10/18.
 */
import {INIT_START, INIT_SUCCESS, INIT_FAIL, PICK_UP_START, PICK_UP_SUCCESS, PICK_UP_FAIL} from '../constants/ActionTypes';

const initState={};

function initStart(state) {
    return Object.assign({},state);
}

function initSuccess(state, order){
    return Object.assign({}, state, order);
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
            return initSuccess(state, action.order);
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
