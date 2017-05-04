/**
 * Created by ruibing on 17/5/4.
 */
module.exports = {
    path:'shoppingCart',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/ShoppingCartContainer/ShoppingCartContainer').default)
        }, 'ShoppingCart')
    },
};