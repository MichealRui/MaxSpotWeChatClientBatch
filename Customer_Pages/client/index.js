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
                <Route path='/productDetail/:storeid/:skuNumber' component={ProductDetail}></Route>
                <Route path='/brand/:storeId/:brandId' component={BrandDetail}></Route>
                <Route path='/switchshop/:storeId' component={SwitchShop}></Route>
                <Route path='/shopDetail/:storeId' component={ShopDetail}></Route>
                <Route path='/shoppingCart' component={ShoppingCart}></Route>
                <Route path='/(:storeId)' component={Home}></Route>
            </Router>
        </Provider>
        ,
        document.getElementById('root')
    );
}

let store = activateVendor();
renderPage(store);
