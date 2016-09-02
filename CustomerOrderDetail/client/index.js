import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
require('./index.css');
import CustomerOrderDetail from './containers/CustomerOrderDetail/CustomerOrderDetail';

ReactDOM.render(
      <CustomerOrderDetail orderDetail={window.Max.orderDetail}/>,
  document.getElementById('root')
);
