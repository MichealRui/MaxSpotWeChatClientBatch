/**
 * Created by ruibing on 17/1/17.
 */
import * as actionTypes from '../actionTypes/common/Message'

function setMessage(content, message) {
    return Object.assign({}, content, {errorMessage: message.errorMessage})
}

export default function(state='', action) {
    switch (action.type) {
        case actionTypes.SET_MESSAGE :
            return setMessage(state, action.message);
        default:
            return state;
    }
}