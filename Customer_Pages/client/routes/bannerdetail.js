/**
 * Created by ruibing on 17/5/4.
 */
module.exports = {
    path:'bannerDetail/:storeId/:campaignId',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/BannerDetailContainer/BannerDetailContainer').default)
        }, 'BannerDetail')
    },
};