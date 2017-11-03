
module.exports = {
    path:'bmap',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/BaiduMapContainer/BaiduMapContainer').default)
        }, 'BaiduMap')
    },
};