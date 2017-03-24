
import * as Message from './common/Message';

const INIT_TAKEGOODS_SUCCESS = 'INIT_TAKEGOODS_SUCCESS';

const INIT_TAKEGOODS_FAIL = 'INIT_TAKEGOODS_FAIL';

const INIT_TAKEGOODS_START = 'INIT_TAKEGOODS_START';

const takeGoodsActionTypes = {INIT_TAKEGOODS_SUCCESS,INIT_TAKEGOODS_FAIL,INIT_TAKEGOODS_START}

module.exports = {...Message,...takeGoodsActionTypes}