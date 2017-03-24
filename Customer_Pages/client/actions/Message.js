/**
 * Created by ruibing on 17/1/17.
 */
import * as actionTypes from '../actionTypes/common/Message'

export function setMessage(message) {
    return {
        type: actionTypes.SET_MESSAGE,
        message
    }
}