import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers/index';
require('./index.css');
import OrderDetail from './containers/OrderDetail/OrderDetail';

function activateVendor(){
    const loggerMiddleware = createLogger();
    const store = createStore(
        reducers,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
    return store;
}

let store = activateVendor();
renderPage(store);

function renderPage(store) {
    ReactDOM.render(
        <Provider store={store}>
            <OrderDetail/>
        </Provider>,
        document.getElementById('root')
    );
}


