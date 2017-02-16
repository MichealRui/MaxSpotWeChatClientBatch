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
                <Route path='/' component={Home}></Route>
                <Route path='/productDetail/:storeid/:skuNumber' component={ProductDetail}></Route>
                <Route path='/brand/:storeId/:brandId' component={BrandDetail}></Route>
            </Router>
        </Provider>
        ,
        document.getElementById('root')
    );
}

let store = activateVendor();
renderPage(store);
