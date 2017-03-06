import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers/index';
import {Router ,Route , hashHistory} from 'react-router';
require('./index.css');
import Home from './containers/PageContainer/pageContainer'
import ProductDetail from './containers/ProductDetailContainer/productDetailContainer'
import BrandDetail from './containers/BrandDetailContainer/brandDetailContainer'
import SwitchShop from './containers/SwitchShopContainer/SwitchShopContainer'
import ShopDetail from './containers/ShopDetailContainer/ShopDetailContainer'
import ShoppingCart from './containers/ShoppingCartContainer/ShoppingCartContainer'
import ConfirmOrder from './containers/ConfirmOrderContainer/confirmOrderContainer'
import PaySuccess from './containers/PaySuccessContainer/PaySuccessContainer'
import OrderList from './containers/OrderListContainer/OrderListContainer'
import OrderDetail from './containers/OrderDetailContainer/OrderDetailContainer'
import TakeGoods from './containers/TakeGoodsContainer/TakeGoodsContainer'
import AfterPay from './containers/AfterPayContainer/AfterPayContainer'
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

function renderPage(store) {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path='/confirmOrder/:orderNumber' component={ConfirmOrder}></Route>
                <Route path='/paySucc/:orderNumber' component={PaySuccess}></Route>
                <Route path='/orderDetail/:orderNumber' component={OrderDetail}></Route>
                <Route path='/takeGoods/:orderNumber' component={TakeGoods}></Route>
                <Route path='/productDetail/:storeid/:skuNumber' component={ProductDetail}></Route>
                <Route path='/brand/:storeId/:brandId' component={BrandDetail}></Route>
                <Route path='/switchshop/:storeId' component={SwitchShop}></Route>
                <Route path='/shopDetail/:storeId' component={ShopDetail}></Route>
                <Route path='/afterPay/:states/:orderNumber' component={AfterPay}></Route>
                <Route path='/shoppingCart' component={ShoppingCart}></Route>
                <Route path='/orderList' component={OrderList}></Route>
                <Route path='/(:storeId)' component={Home}></Route>
            </Router>
        </Provider>
        ,
        document.getElementById('root')
    );
}

let store = activateVendor();
renderPage(store);
