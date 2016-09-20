import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
require('./index.css');
import Banner from './containers/BannerContainer/bannerContainer';
import HomeContainer from './containers/HomeContainer/HomeContainer';

//Mock data

let data={
    bannerdata:[
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
    ],
    logo:"http://192.168.20.225:8080/client/components/HomeHeader/images/logo.png",
    address:'毛纺路小米3号楼办公区B1便利店',
    homeMadeImg:'http://192.168.20.225:8080/client/components/HomeMade/images/homeMade.jpg'
};

ReactDOM.render(
    <HomeContainer data={data}/>,
  document.getElementById('root')
);
