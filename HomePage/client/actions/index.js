/**
 * Created by ruibing on 16/9/19.
 */

import fetch from 'isomorphic-fetch'

export const CHANGE_SUBCONTENT = 'CHANGE_SUBCONTENT';

export const INIT_SUBCONTENT = 'INIT_SUBCONTENT';

export const INIT_START = 'INIT_START';

export const INIT_SUCCESS = 'INIT_SUCCESS';

export const INIT_FAIL = 'INIT_FAIL';

export function initSubContent() {
    return (dispatch) =>  {
        dispatch(initStart());
        fetch( '',// initurl  //'http://localhost:9000/fetchitem',
            {
                method: 'POST',
                mode: 'cors',
                Origin: '*',
            }
        ).then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    dispatch(initSuccess(json.content))
                } else {
                    dispatch(initFail())
                }
            })
    }
}

export function initStart() {
    return {
        type: INIT_START
    }
}

export function initSuccess(content) {
    return {
        type: INIT_SUCCESS,
        content
    }
}

export function initFail() {
    return {
        type: INIT_FAIL
    }
}

export function changeSubContent(key) {
    return {
        type: CHANGE_SUBCONTENT,
        key
    }
}