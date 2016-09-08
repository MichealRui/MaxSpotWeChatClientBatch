import ReactDOM from 'react-dom'
import React from 'react'
import CheckOut from './containers/CheckOut/CheckOut';
import fetch from 'isomorphic-fetch';

// fetch('http://www.mjitech.com/web/seller_api/wx_request_pay.action ',
//     {
//         method: 'POST',
//         mode: 'cors',
//         Origin: '*',
//         body: JSON.stringify({
//             order_number:"SO20160908171256001",
//             open_id:"123456"
//         })
//     });
ReactDOM.render(
    <CheckOut order={window.Max.order}/>,
    document.getElementById('root')
);