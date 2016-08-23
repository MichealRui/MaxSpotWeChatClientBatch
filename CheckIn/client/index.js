
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import CheckIn from './containers/CheckIn/CheckIn';
import reducers from './reducers/index';

// const store = configure()
const loggerMiddleware = createLogger();
const store = createStore(
    reducers,
    applyMiddleware (
        thunkMiddleware,
        loggerMiddleware
    )
);
// const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
      <CheckIn/>
    {/*<Router history={history}>*/}
      {/*<Route path="/" component={App}>*/}
      {/*</Route>*/}
    {/*</Router>*/}
  </Provider>,
  document.getElementById('root')
);
