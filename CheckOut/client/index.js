import ReactDOM from 'react-dom'
import React from 'react'
import CheckOut from './containers/CheckOut/CheckOut';
ReactDOM.render(
    <CheckOut order={window.Max.order}/>,
    document.getElementById('root')
);