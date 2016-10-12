/**
 * Created by ruibing on 16/10/11.
 */
import {INIT_START ,INIT_SUCCESS, INIT_FAIL} from '../reducers/index';

export default function (
    content=data, action) {
    switch (action.type) {
        case INIT_START:
            return initStart(content);
        case INIT_SUCCESS:
            return initSuccess(content, action.content);
        case INIT_FAIL:
            return initFail(content);
        default:
            return content;
    }
}