/**
 * Created by ruibing on 17/5/4.
 */
module.exports = {
    path:'afterPay/:states/:orderNumber',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/AfterPayContainer/AfterPayContainer').default)
        }, 'AfterPay')
    },
};