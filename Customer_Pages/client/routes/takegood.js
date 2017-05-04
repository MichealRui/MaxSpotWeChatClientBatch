/**
 * Created by ruibing on 17/5/4.
 */
module.exports = {
    path:'takeGoods/:orderNumber',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/TakeGoodsContainer/TakeGoodsContainer').default)
        }, 'TakeGood')
    },
};