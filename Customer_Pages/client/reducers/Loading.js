/**
 * Created by ruibing on 17/1/17.
 */
import * as actionTypes from '../actionTypes/common/Loading'

function toggleStatue(state,content) {
    if(state.status){
        return Object.assign({}, state,content)
    }else{
        return Object.assign({}, state)
    }

}

export default function(state={status:true}, action) {
    switch (action.type) {
        case actionTypes.TOGGLE_STATUS :
            return toggleStatue(state,action.content);
        default:
            return state;
    }
}