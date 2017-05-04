/**
 * Created by ruibing on 17/5/3.
 */
module.exports = {
    path:'confirmOrder/:orderNumber',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/ConfirmOrderContainer/confirmOrderContainer').default)
        }, 'ConfirmOrder')
    },
};