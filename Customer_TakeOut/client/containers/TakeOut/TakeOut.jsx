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
        this.num = 1;
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
        // console.log('number : ' + this.props.order.orderNumber);
        this.fetchOrderStatus(this.props.order.orderNumber);
    }

    fetchOrderStatus(on) {
        const Taking = 4;
        // console.log(on);
        // console.log(this.orderStatusApi);
        fetch( this.orderStatusApi,
            {
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                Origin: '*',
                body: JSON.stringify({
                    order_number: on ,
                })
            })
            .then(response => response.json())
            .then(json => {
                console.log("this.num : " + this.num);
                console.log(json);
                this.num++;
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

    render(){
        let order =this.props.order;
        let appId = 'wx4da5ecd6305e620a';
        let takeUri = encodeURIComponent("http://www.mjitech.com/web/wxauthorize.action");
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
        // console.log(defUrl);
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