import * as Cart from './common/Cart';
import * as Message from './common/Message';
import * as Weixin from './common/Weixin';

const INIT_PRODUCT_START = 'INIT_PRODUCT_START';
const INIT_PRODUCT_SUCCESS = 'INIT_PRODUCT_SUCCESS';
const INIT_PRODUCT_FAIL = 'INIT_PRODUCT_FAIL';
const ProductDetailActionTypes = {INIT_PRODUCT_START,INIT_PRODUCT_SUCCESS,INIT_PRODUCT_FAIL};
module.exports = {...Cart,...Message,...Weixin,...ProductDetailActionTypes};