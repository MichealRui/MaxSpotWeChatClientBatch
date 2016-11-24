'use strict';
import React from 'react';
import fetch from 'isomorphic-fetch';
import ConfirmWindow from '../../components/ConfirmWindow/ConfirmWindow';
import QrCode from '../../components/QrCode/QrCode';
import WindowText from '../../components/WindowText';
require('./index.css');

class TakeOut extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            isSuccess:true
        };
        this.orderStatusApi = ENV.domain + '/web/buyer_api/order_detail.ction';
        this.sleepTime = 1000;
    }
    
    acknowledgedFalse() {
        this.setState({
            isSuccess:false
        })
    }
    
    acknowledgedTrue() {
        this.setState({
            isSuccess:true
        })
    }

    componentDidMount() {
        this.fetchOrderStatus(this.props.order.orderNumber);
    }

    fetchOrderStatus(on) {
        const Taking = 4;
        fetch( this.orderStatusApi,
            {
                method: 'POST',
                mode: 'cors',
                Origin: '*',
                body: JSON.stringify({
                    order_number: on ,
                })
            })
            .then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    console.log("status: " + json.order.status);
                    if(json.order.status == Taking) { //4 means taking from machine
                        window.location.href = "http://www.mjitech.com/buyer_takestatus/index.html"
                        + '?state=1&ordernumber=' + json.order.orderNumber
                    } else {
                        window.setTimeout( () => this.fetchOrderStatus(on), this.sleepTime)
                    }
                }
            })
    }

    encodeUTF8(str){
        var temp = "",rs = "";
        for( var i=0 , len = str.length; i < len; i++ ){
            temp = str.charCodeAt(i).toString(16);
            rs  += "\\u"+ new Array(5-temp.length).join("0") + temp;
        }
        return rs;
    }
    decodeUTF8(str){
        return str.replace(/(\\u)(\w{4}|\w{2})/gi, function($0,$1,$2){
            return String.fromCharCode(parseInt($2,16));
        });
    }

    render(){
        let order =this.props.order;
        let appId = 'wx4da5ecd6305e620a';
        let takeUri = this.encodeUTF8("http://www.mjitech.com/web/wxauthorize.action");
        let defUrl=
            'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId +
            '&redirect_uri=' + takeUri +
            '&response_type=code&scope=snsapi_base' +
            '&state=taking_goods_' + order.takeGoodsNumber +'#wechat_redirect';

        // let order = {
        //     shopName:'光华路SOHO2',
        //     order:{
        //         orderNumber:'S20160687ASDQ',
        //         totalPrice: 0
        //     },
        //     takeUri: takeUri
        // }
        console.log(defUrl);
        return(
            <div>
                <QrCode order={order}
                        takeuri={defUrl}
                        onFailClick={this.acknowledgedFalse.bind(this)}
                />
                <ConfirmWindow windowText={WindowText}
                               isHidden={this.state.isSuccess}
                               hideClick={this.acknowledgedTrue.bind(this)}/>
            </div>
        );
    }
}

export default TakeOut