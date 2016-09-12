import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
require('./index.css');
import OrderDetail from './containers/OrderDetail/OrderDetail';

ReactDOM.render(
      <OrderDetail orderDetail={window.Max.orderDetail}/>,
  document.getElementById('root')
);
