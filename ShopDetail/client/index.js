import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
require('./index.css');
import SwitchShop from './containers/ShopContainer/ShopContainer';

ReactDOM.render(
      <SwitchShop/>,
  document.getElementById('root')
);
