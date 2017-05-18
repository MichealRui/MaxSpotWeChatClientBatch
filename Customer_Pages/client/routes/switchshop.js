/**
 * Created by ruibing on 17/5/4.
 */
module.exports = {
    path:'switchshop/:storeId',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/SwitchShopContainer/SwitchShopContainer').default)
        }, 'SwitchShop')
    },
};