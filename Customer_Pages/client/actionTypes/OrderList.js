import * as Message from './common/Message';

const INIT_ORDERLIST_START = 'INIT_ORDERLIST_START';
const INIT_ORDERLIST_SUCCESS = 'INIT_ORDERLIST_SUCCESS';
const INIT_ORDERLIST_FALI = 'INIT_ORDERLIST_FALI';
const OrderListActionTypes = {INIT_ORDERLIST_START,INIT_ORDERLIST_SUCCESS,INIT_ORDERLIST_FALI};
module.exports = {...Message,...OrderListActionTypes};