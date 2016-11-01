import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
require('./index.css');
import Brand from './containers/Brand/Brand';
import reducers from './reducers/index'


function activateVender() {
    const loggerMiddleware = createLogger();
    const store = createStore(
        reducers,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
    return store;
}

function renderComponents(store) {
    ReactDOM.render(
        <Provider store={store}>
            <Brand></Brand>
        </Provider>,
        document.getElementById('root')
    );
}

let store = activateVender();
renderComponents(store);