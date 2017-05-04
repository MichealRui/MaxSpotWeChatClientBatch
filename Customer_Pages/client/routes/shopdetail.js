/**
 * Created by ruibing on 17/5/4.
 */
module.exports = {
    path:'shopDetail/:storeId',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/ShopDetailContainer/ShopDetailContainer').default)
        }, 'ShopDetail')
    },
};