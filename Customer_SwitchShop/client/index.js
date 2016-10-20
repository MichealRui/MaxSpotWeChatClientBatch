import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
require('./index.css');
import SwitchShop from './containers/SwitchShop/SwitchShop';
import reducers from './reducers/index';

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

function renderPage(store) {
    ReactDOM.render(
        <Provider store={store}>
            <SwitchShop />
        </Provider>,
        document.getElementById('root')
    );
}

renderPage(activateVendor());


