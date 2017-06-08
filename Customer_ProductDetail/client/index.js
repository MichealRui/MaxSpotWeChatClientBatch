import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
require('./index.css');
import ProductDetail from './containers/ProductDetail/ProductDetail';
import reducers from './reducers/index';

function vanderStore() {
    const loggerMiddleware = createLogger();
    const store = createStore(
        reducers,
        applyMiddleware(
            loggerMiddleware,
            thunkMiddleware
        )
    );
    return store;
}


function renderPage(store){
    ReactDOM.render(
        <Provider store={store}>
            <ProductDetail />
        </Provider>,
        document.getElementById('root')
    );
}


const store = vanderStore();
renderPage(store);


