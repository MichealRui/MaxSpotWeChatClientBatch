import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers/index';
import {Router, hashHistory} from 'react-router';
import {clearPromotion} from './actions/Promotion'
import routes from './routes/index'
require('./index.css');

// init thunk

function activateVendor() {
    const loggerMiddleware = createLogger();
    return createStore(
        reducers,
        applyMiddleware (
            thunkMiddleware,
            loggerMiddleware
        )
    );
}

function hands() {
    const{dispatch} = store;
    dispatch(clearPromotion());
}

function renderPage(store) {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={hashHistory} routes={routes}>
                {/*<Route path='/confirmOrder/:orderNumber' component={ConfirmOrder}></Route>*/}
                {/*<Route path='/paySucc/:orderNumber' component={PaySuccess}></Route>*/}
                {/*<Route path='/orderDetail/:orderNumber' component={OrderDetail}></Route>*/}
                {/*<Route path='/takeGoods/:orderNumber' component={TakeGoods}></Route>*/}
                {/*<Route path='/productDetail/:storeid/:skuNumber' component={ProductDetail}></Route>*/}
                {/*<Route path='/brand/:storeId/:brandId' component={BrandDetail}></Route>*/}
                {/*<Route path='/switchshop/:storeId' component={SwitchShop}></Route>*/}
                {/*<Route path='/shopDetail/:storeId' component={ShopDetail}></Route>*/}
                {/*<Route path='/afterPay/:states/:orderNumber' component={AfterPayOld}></Route>*/}
                {/*<Route path='/bannerDetail/:storeId/:campaignId' component={BannerDetail}></Route>*/}
                {/*<Route path='/shoppingCart' component={ShoppingCart}></Route>*/}
                {/*<Route path='/orderList' component={OrderList}></Route>*/}
                {/*<Route path='/activity/:type/:storeId' component={Activity} onEnter={hands.bind(this)}></Route>*/}
                {/*<Route path='/(:storeId)' component={Home}></Route>*/}
            </Router>
        </Provider>
        ,
        document.getElementById('root')
    );
}

let store = activateVendor();
renderPage(store);
