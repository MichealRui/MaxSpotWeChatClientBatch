/**
 * Created by ruibing on 17/5/3.
 */
/**
<Route path='/confirmOrder/:orderNumber' component={ConfirmOrder}></Route>
<Route path='/paySucc/:orderNumber' component={PaySuccess}></Route>
    <Route path='/orderDetail/:orderNumber' component={OrderDetail}></Route>
    <Route path='/takeGoods/:orderNumber' component={TakeGoods}></Route>
    <Route path='/productDetail/:storeid/:skuNumber' component={ProductDetail}></Route>
    <Route path='/brand/:storeId/:brandId' component={BrandDetail}></Route>
    <Route path='/switchshop/:storeId' component={SwitchShop}></Route>
    <Route path='/shopDetail/:storeId' component={ShopDetail}></Route>
    <Route path='/afterPay/:states/:orderNumber' component={AfterPayOld}></Route>
    <Route path='/BannerDetail/:storeId/:campaignId' component={BannerDetail}></Route>
    <Route path='/shoppingCart' component={ShoppingCart}></Route>
    <Route path='/orderList' component={OrderList}></Route>
    <Route path='/activity/:type/:storeId' component={Activity} onEnter={hands.bind(this)}></Route>
<Route path='/(:storeId)' component={Home}></Route>
**/
module.exports = {
    path: '/',
    indexRoute: {
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../containers/PageContainer/pageContainer').default)
            }, 'HomePage')
        },
    },
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/App/App').default)
        }, 'App')
    },
    childRoutes: [
        require('./productdetail'),
        require('./confirmorder'),
        require('./paysucc'),
        require('./activity'),
        require('./afterpay'),
        require('./bannerdetail'),
        require('./branddetail'),
        require('./orderlist'),
        require('./orderdetail'),
        require('./paysucc'),
        require('./shopdetail'),
        require('./shoppingcart'),
        require('./switchshop'),
        require('./takegood'),
    ]
};