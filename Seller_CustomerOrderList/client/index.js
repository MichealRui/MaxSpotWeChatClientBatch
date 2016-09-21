import ReactDOM from 'react-dom'
import React from 'react'
import fetch from 'isomorphic-fetch';
require('./index.css');
// require('./font-awesome-4.5.0/css/font-awesome.min.css');
import CustomerOrderList from './containers/CustomerOrderList/CustomerOrderList';

Date.prototype.Format = function(fmt)
    {
        var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "H+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
    };

fetch('http://www.mjitech.com/web/seller_api/wx_order_list.action',
    {
        method: 'POST',
        mode: 'cors',
        Origin: '*',
        body: JSON.stringify(
            Object.assign({}, {open_id: "123456"})
        )
    }
    ).then(response => response.json())
    .then(json => {
        if(json.is_succ) {
            ReactDOM.render(
                <CustomerOrderList orderList={json.orders}/>,
                document.getElementById('root')
            )
        } else {
            ReactDOM.render(
                <div>服务器异常请刷新页面</div>,
                document.getElementById('root')
            )
        }
    });