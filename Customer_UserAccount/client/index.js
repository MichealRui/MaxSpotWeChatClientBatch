import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
require('./index.css');
import UserAccount from './containers/UserAccount/UserAccount.jsx';

ReactDOM.render(
	  <UserAccount />,
  document.getElementById('root')
);
