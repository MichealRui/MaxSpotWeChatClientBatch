/**
 * Created by ruibing on 17/1/12.
 */
import * as Message from './common/Message';

const INIT_ORDERDETAIL_SUCCESS = 'INIT_ORDERDETAIL_SUCCESS';

const INIT_ORDERDETAIL_FAIL = 'INIT_ORDERDETAIL_FAIL';

const INIT_ORDERDETAIL_START = 'INIT_ORDERDETAIL_START';

const orderDetailActionTypes = {INIT_ORDERDETAIL_SUCCESS,INIT_ORDERDETAIL_FAIL,INIT_ORDERDETAIL_START}

module.exports = {...Message,...orderDetailActionTypes}
