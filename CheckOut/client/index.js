import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import CheckOut from './containers/CheckOut/CheckOut';

ReactDOM.render(
      <CheckOut/>,
  document.getElementById('root')
);
