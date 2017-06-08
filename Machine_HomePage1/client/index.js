import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, Route, hashHistory } from 'react-router';
import reducers from './reducers/index';
require('./index.css');
import Page from './containers/PageContainer/PageContainer';
// import Activity from './containers/active/Active';
import {clearActivity} from './actions'
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

function clearActivit() {
    const{dispatch} = store;
    dispatch(clearActivity());
}

function renderPage(store) {
    ReactDOM.render(
        <Provider store={store}>
            {/*<Page />*/}
            <Router history={hashHistory}>
                <Route path='/' component={Page}/>
                <Route path='/maxbox_pc' component={Page}/>
                {/*<Route path='/maxbox_pc/orderTest' component={Page}/>*/}
                {/*<Route path='/active/:campaignId/:type' component={Activity} onEnter={clearActivit}/>*/}
            </Router>
            {/*<Activity/>*/}
        </Provider>
        ,
        document.getElementById('root')
    );
}

let store = activateVendor();
renderPage(store);