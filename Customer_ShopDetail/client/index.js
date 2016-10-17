import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
require('./index.css');
import SwitchShop from './containers/ShopContainer/ShopContainer';
import reducers from './reducers/index';


function activateVender() {
    const loggerMiddleware = createLogger();
    console.log(loggerMiddleware);
    const store = createStore(
        reducers,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
    return store;
}

function renderComponents(store) {
    ReactDOM.render(
        <Provider store={store} >
            <SwitchShop />
        </Provider>,
        document.getElementById("root")
    );
}

let store = activateVender();
renderComponents(store)