import ReactDOM from 'react-dom'
import React from 'react'
import CheckOut from './containers/CheckOut/CheckOut';
import fetch from 'isomorphic-fetch';
import Util from './util/WeChatUtil';
require('./index.css');
// require('./font-awesome-4.5.0/css/font-awesome.min.css');
fetch('http://www.mjitech.com/web/seller_api/wx_request_pay.action ',
    {
        method: 'POST',
        mode: 'cors',
        Origin: '*',
        body: JSON.stringify(
            Object.assign({}, {"open_id": "123456"}, Util.getUrlParam("order_number"))
        )
    }).then(response => response.json())
    .then(json => {
        if(json.is_succ) {
            ReactDOM.render(
                <CheckOut order={json}/>,
                document.getElementById('root')
            )
        } else {
            ReactDOM.render(
                <div>服务器异常请刷新页面</div>,
                document.getElementById('root')
            )
        }
    });