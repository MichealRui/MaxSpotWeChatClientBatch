/**
 * Created by ruibing on 17/5/4.
 */
module.exports = {
    path:'brand/:storeId/:brandId',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/BrandDetailContainer/brandDetailContainer').default)
        }, 'BrandDetail')
    },
};