import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import CheckIn from './containers/CheckIn/CheckIn';
import reducers from './reducers/index';
import WeXinUtil from './util/WeChatUtil';
require('./index.css');
require('./font-awesome-4.5.0/css/font-awesome.min.css');


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
            <CheckIn/>
        </Provider>,
        document.getElementById('root')
    );
}

//if(!WeXinUtil.isInWeXin()) { //dev
if(WeXinUtil.isInWeXin()) { //prod
    let code = WeXinUtil.setWeXinCode();
    let store = activateVendor();
    renderComponents(store)
} else {
    let alertStyle = {textAlign:'center'};
    ReactDOM.render(
        <div style={alertStyle}>请在微信端打开</div>,
        document.getElementById('root')
    );
}

