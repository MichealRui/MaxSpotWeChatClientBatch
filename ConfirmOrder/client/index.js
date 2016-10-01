import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
require('./index.css');
import ConfirmOrder from './containers/ConfirmOrder/ConfirmOrder';

ReactDOM.render(
      <ConfirmOrder confirmOrder={window.Max.confirmOrder}/>,
  document.getElementById('root')
);
