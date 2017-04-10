import * as Cart from './common/Cart';
import * as Message from './common/Message';
import * as Weixin from './common/Weixin';

const INIT_CONFIRM_ORDER_START = 'INIT_CONFIRM_ORDER_START';
const INIT_CONFIRM_ORDER_SUCCESS = 'INIT_CONFIRM_ORDER_SUCCESS';
const INIT_CONFIRM_ORDER_FAIL = 'INIT_CONFIRM_ORDER_FAIL';
const ConfirmOrderActionTypes = {INIT_CONFIRM_ORDER_START,INIT_CONFIRM_ORDER_SUCCESS,INIT_CONFIRM_ORDER_FAIL};
module.exports = {...Cart,...Message,...ConfirmOrderActionTypes, ...Weixin};