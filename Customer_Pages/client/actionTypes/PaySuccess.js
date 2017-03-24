
import * as Message from './common/Message';

const INIT_PAYSUCCESS_SUCCESS = 'INIT_PAYSUCCESS_SUCCESS';

const INIT_PAYSUCCESS_FAIL = 'INIT_PAYSUCCESS_FAIL';

const INIT_PAYSUCCESS_START = 'INIT_PAYSUCCESS_START';

const paySuccessActionTypes = {INIT_PAYSUCCESS_SUCCESS,INIT_PAYSUCCESS_FAIL,INIT_PAYSUCCESS_START}

module.exports = {...Message,...paySuccessActionTypes}