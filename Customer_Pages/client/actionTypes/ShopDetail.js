import * as Message from './common/Message';

const INIT_SHOP_DETAIL_START = 'INIT_SHOP_DETAIL_START';
const INIT_SHOP_DETAIL_SUCCESS = 'INIT_SHOP_DETAIL_SUCCESS';
const INIT_SHOP_DETAIL_FAIL = 'INIT_SHOP_DETAIL_FAIL';
const ShopDetailActionTypes = {INIT_SHOP_DETAIL_START,INIT_SHOP_DETAIL_SUCCESS,INIT_SHOP_DETAIL_FAIL};
module.exports = {...Message,...ShopDetailActionTypes};