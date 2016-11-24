import ReactDOM from 'react-dom'
import React from 'react'
import fetch from 'isomorphic-fetch';
import Util from './util/WeChatUtil';

require('./index.css');
// require('./font-awesome-4.5.0/css/font-awesome.min.css');
import CustomerOrderDetail from './containers/CustomerOrderDetail/CustomerOrderDetail';


const detailByOrderNumber = 'http://114.215.143.97/web/seller_api/wx_order_detail.action';
const detailByTakingNubmer = 'http://114.215.143.97/web/seller_api/wx_order_detail_by_takingnumber.action';
let params = Util.getUrlParam();
let orderNumber = params["order_number"] || '';
let takingNumber = params["taking_number"] || '';
let requestUrl;
let requestParam;
if(orderNumber) {
    requestUrl = detailByOrderNumber;
    requestParam = {order_number:orderNumber}
} else if(takingNumber) {
    requestUrl = detailByTakingNubmer;
    requestParam = {taking_number:takingNumber}
}

fetch(requestUrl,
    {
        method: 'POST',
        mode: 'cors',
        Origin: '*',
        body: JSON.stringify(
            requestParam
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
            alert(json.error_message)
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
