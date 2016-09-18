import ReactDOM from 'react-dom'
import React from 'react'
import fetch from 'isomorphic-fetch';
import Util from './util/WeChatUtil';

require('./index.css');
require('./font-awesome-4.5.0/css/font-awesome.min.css');
import CustomerOrderDetail from './containers/CustomerOrderDetail/CustomerOrderDetail';


fetch("http://www.mjitech.com/web/seller_api/wx_order_detail.action",
        // "http://www.mjitech.com/web/seller_api/wx_order_status.action",
    {
        method: 'POST',
        mode: 'cors',
        Origin: '*',
        body: JSON.stringify(
            Object.assign({}, {open_id: "123456"}, Util.getUrlParam("order_number"))
        )
    })
    .then(response => response.json())
    .then(json => {
        if(json.is_succ) {
            ReactDOM.render(
                <CustomerOrderDetail orderDetail={json.order}/>,
                document.getElementById('root')
            )
        } else {
            ReactDOM.render(
                <div>服务器异常请刷新页面</div>,
                document.getElementById('root')
            )
        }
    });

//
// ReactDOM.render(
//       <CustomerOrderDetail orderDetail={window.Max.orderDetail}/>,
//   document.getElementById('root')
// );
