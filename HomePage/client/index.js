import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers/index';
import fetch from 'isomorphic-fetch'
require('./index.css');
require('./font-awesome-4.5.0/css/font-awesome.min.css');
import Page from './containers/PageContainer/pageContainer'

//Mock data

let bannerdata = [
    {
        destUrl: "http://www.baidu.com",
        imagePath: "http://photos.cntraveler.com/2014/09/29/5429c32b425f183f61bf7316_new-york-city-skyline.jpg"
    },
    {
        destUrl: "http://www.baidu.com",
        imagePath: "https://ephemeralnewyork.files.wordpress.com/2010/08/broadway47thstreet2010.jpg"
    },
    {
        destUrl: "http://www.baidu.com",
        imagePath: "http://photos.cntraveler.com/2014/09/29/5429c32b425f183f61bf7316_new-york-city-skyline.jpg"
    },
    {
        destUrl: "http://www.baidu.com",
        imagePath: "https://ephemeralnewyork.files.wordpress.com/2010/08/broadway47thstreet2010.jpg"
    }
    ];

let selector = [
    {key: 'food', content: '食品'},
    {key: 'drink', content: '酒饮'},
    {key: 'makeup', content: '美妆'},
    {key: 'daily', content: '日用品'},
    {key: 'baby', content: '母婴'}
];

let subContent =
    [
        {
        key: 'food',
        banner:{
            imgPath: 'http://photos.cntraveler.com/2014/09/29/5429c32b425f183f61bf7316_new-york-city-skyline.jpg',
            bannerDist: 'http://www.baidu.com'
        },
        freeItems: [
            {}, {}, {}
        ],
        items: [
            {},
            {},
            {}
            ]
        }
    ];

let data = {
    banner: bannerdata,
    selector: selector,
    subContent: subContent
};

// init thunk
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

function fetchInitData() {
    fetch('',
        {
            method: 'POST',
            mode: 'cors',
            Origin: '*',
            body: JSON.stringify({
                open_id: '123456',
                sku_number: skuNumber,
            })
        }
    ).then(response => response.json())
        .then(json => {
            if(json.is_succ) {
                
            }
        })
}

function renderPage(store) {
    ReactDOM.render(
        <Provider store={store}>
            <Page data={data} getInitData=/>
        </Provider>
        ,
        document.getElementById('root')
    );
}

let store = activateVendor();
renderPage(store);
