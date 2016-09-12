import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
require('./index.css');
import Coupon from './containers/Coupon/Coupon';

ReactDOM.render(
      <Coupon Coupon={window.Max.Coupon}/>,
  document.getElementById('root')
);
