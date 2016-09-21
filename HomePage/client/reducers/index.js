/**
 * Created by ruibing on 16/9/19.
 */
import { CHANGE_SUBCONTENT, INIT_SUBCONTENT } from '../actions/index'
import { INIT_START, INIT_SUCCESS, INIT_FAIL}

function changeSubContent(key) {
    

}

function initSubContent(content) {
    return {
        current: content[0],
        list: content
    }
}

function initStart() {
    
}

function initSuccess(){
    
}

function initFail() {
    
}

export default function (subContent={}, action) {
    switch (action.type) {
        case INIT_SUBCONTENT:
            return initSubContent(action.content)
        case CHANGE_SUBCONTENT:
            return changeSubContent(action.key);
        default:
            return subContent;
    }
}