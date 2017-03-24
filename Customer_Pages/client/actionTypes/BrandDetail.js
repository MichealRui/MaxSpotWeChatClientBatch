import * as Cart from './common/Cart';
import * as Message from './common/Message';

const INIT_BRAND_START = 'INIT_BRAND_START';
const INIT_BRAND_SUCCESS = 'INIT_BRAND_SUCCESS';
const INIT_BRAND_FAIL = 'INIT_BRAND_FAIL';
const BrandDetailActionTypes = {INIT_BRAND_START,INIT_BRAND_SUCCESS,INIT_BRAND_FAIL};
module.exports = {...Cart,...Message,...BrandDetailActionTypes};