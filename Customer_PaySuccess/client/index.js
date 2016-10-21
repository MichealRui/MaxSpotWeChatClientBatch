import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
require('./index.css');
import PaySucess from './containers/PaySuccess/PaySuccess';

ReactDOM.render(
      <PaySucess/>,
  document.getElementById('root')
);
