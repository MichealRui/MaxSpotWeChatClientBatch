/**
 * Created by ruibing on 17/5/4.
 */
module.exports = {
    path:'orderList',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/OrderListContainer/OrderListContainer').default)
        }, 'OrderList')
    },
};