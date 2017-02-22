import * as Message from './common/Message';

const INIT_PAY_SUCCESS_START = 'INIT_PAY_SUCCESS_START';
const INIT_PAY_SUCCESS_SUCCESS = 'INIT_PAY_SUCCESS_SUCCESS';
const INIT_PAY_SUCCESS_FAIL = 'INIT_PAY_SUCCESS_FAIL';
const PaySuccessActionTypes = {INIT_PAY_SUCCESS_START,INIT_PAY_SUCCESS_SUCCESS,INIT_PAY_SUCCESS_FAIL};
module.exports = {...Message,...PaySuccessActionTypes};