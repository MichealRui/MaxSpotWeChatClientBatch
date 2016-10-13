import ReactDOM from 'react-dom'
import React from 'react'

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers/index';
require('./index.css');
import ConfirmOrder from './containers/ConfirmOrder/ConfirmOrder';

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
            <ConfirmOrder/>
        </Provider>
        ,document.getElementById('root')
    );
}

let store = activateVendor();
renderPage(store);
