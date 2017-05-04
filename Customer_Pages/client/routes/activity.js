/**
 * Created by ruibing on 17/5/4.
 */
module.exports = {
    path:'activity/:type/:storeId',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/PromotionContainer/PromotionContainer').default)
        }, 'Promotion')
    },
};