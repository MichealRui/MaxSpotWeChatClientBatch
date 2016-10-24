import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import ShoppingCart from './containers/ShoppingCart/ShoppingCart';
import reducers from './reducers/index';
import WeXinUtil from './util/WeChatUtil';
import fetch from 'isomorphic-fetch';


function activateVendor() {
    const loggerMiddleware = createLogger();
    const store = createStore(
        reducers,
        applyMiddleware (
            thunkMiddleware,
            loggerMiddleware
        )
    );
    return store
}

function renderComponents(store) {
    
    // fetch('http://www.mjitech.com/web/seller_api/wx_test_openid.action',
    //     {
    //         method: 'POST',
    //         mode: 'cors',
    //         // Origin: 'http://www.mjitech.com',
    //         body: JSON.stringify({
    //             openid: '123456',
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(json => console.log(json))
    
    
    ReactDOM.render(
        <Provider store={store}>
            <ShoppingCart />
        </Provider>,
        document.getElementById('root')
    );
}

renderComponents(activateVendor());

