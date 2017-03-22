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
import Activity from './containers/active/Active';
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
            <Page />
            {/*<Router history={hashHistory}>*/}
                {/*/!*<Route path='/' component={Page}/>*!/*/}
                {/*/!*<Route path='/maxbox_pc' component={Page}/>*!/*/}
                {/*/!*<Route path='/maxbox_pc/orderTest' component={Page}/>*!/*/}
                {/*<Route path='/active' component={Activity}/>*/}
            {/*</Router>*/}
        </Provider>
        ,
        document.getElementById('root')
    );
}

let store = activateVendor();
renderPage(store);