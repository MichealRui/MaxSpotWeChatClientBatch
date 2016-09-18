import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
require('./index.css');
import Banner from './containers/BannerContainer/bannerContainer';

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


ReactDOM.render(
      <Banner bannerData={bannerdata}/>,
  document.getElementById('root')
);
