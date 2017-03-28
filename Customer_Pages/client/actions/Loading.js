/**
 * Created by ruibing on 17/1/17.
 */
import * as actionTypes from '../actionTypes/common/Loading'

export function toggleStatue(content) {
    return {
        type: actionTypes.TOGGLE_STATUS,
        content
    }
}