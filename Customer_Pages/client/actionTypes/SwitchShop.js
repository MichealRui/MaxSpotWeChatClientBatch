import * as Message from './common/Message';

const INIT_SWITCH_SHOP_START = 'INIT_SWITCH_SHOP_START';
const INIT_SWITCH_SHOP_SUCCESS = 'INIT_SWITCH_SHOP_SUCCESS';
const INIT_SWITCH_SHOP_FAIL = 'INIT_SWITCH_SHOP_FAIL';
const SwitchShopActionTypes = {INIT_SWITCH_SHOP_START,INIT_SWITCH_SHOP_SUCCESS,INIT_SWITCH_SHOP_FAIL};
module.exports = {...Message,...SwitchShopActionTypes};