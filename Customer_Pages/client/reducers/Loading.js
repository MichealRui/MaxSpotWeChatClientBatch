/**
 * Created by ruibing on 17/1/17.
 */
import * as actionTypes from '../actionTypes/common/Loading'

function toggleStatue(content) {
    return Object.assign({}, content)
}

export default function(state={status:true}, action) {
    switch (action.type) {
        case actionTypes.TOGGLE_STATUS :
            return toggleStatue(action.content);
        default:
            return state;
    }
}