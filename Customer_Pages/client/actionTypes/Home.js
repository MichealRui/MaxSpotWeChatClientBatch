/**
 * Created by ruibing on 17/1/12.
 */
import * as Cart from './common/Cart';

import * as Weixin from './common/Weixin';

import * as Message from './common/Message';

import * as Location from './common/Location';

const INIT_START = 'INIT_START';

const INIT_SUCCESS = 'INIT_SUCCESS';

const INIT_FAIL = 'INIT_FAIL';

const CHANGE_SUBCONTENT = 'CHANGE_SUBCONTENT';

const HomeActionTypes = {INIT_START, INIT_SUCCESS, INIT_FAIL, CHANGE_SUBCONTENT};

module.exports =  {...Cart, ...Message, ...Weixin, ...Location, ...HomeActionTypes};