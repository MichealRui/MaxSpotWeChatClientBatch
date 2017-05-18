/**
 * Created by ruibing on 17/5/4.
 */
module.exports = {
    path:'orderDetail/:orderNumber',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/OrderDetailContainer/OrderDetailContainer').default)
        }, 'OrderDetail')
    },
};