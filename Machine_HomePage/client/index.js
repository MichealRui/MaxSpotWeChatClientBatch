import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, Route, IndexRedirect, Redirect, hashHistory } from 'react-router';
import reducers from './reducers/index';
require('./index.css');
import Page from './containers/PageContainer/PageContainer';
import Activity from './containers/active/Active';
import HoleActivity from './containers/HoleActive/HoleActive';
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
                <Route path='/' component={Page}/>
                <Route path='/maxbox_pc' component={Page}/>
                <Route path='/maxbox_pc/orderTest' component={Page}/>
                <Route path='/active' component={Activity}/>
                <Route path='/whole-active' component={HoleActivity}/>
            </Router>
        </Provider>
        ,
        document.getElementById('root')
    );
}

let store = activateVendor();
renderPage(store);