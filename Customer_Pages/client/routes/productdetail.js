/**
 * Created by ruibing on 17/5/3.
 */
module.exports = {
    path:'productDetail/:storeid/:skuNumber',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/ProductDetailContainer/productDetailContainer').default)
        }, 'ProductDetail')
    },
};