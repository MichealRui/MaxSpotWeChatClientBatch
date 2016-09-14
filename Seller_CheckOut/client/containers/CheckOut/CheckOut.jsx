'use static';
import React from 'react';
import fetch from 'isomorphic-fetch';
import ConfirmWindow from '../../components/ConfirmWindow/ConfirmWindow';
import QrCode from '../../components/QrCode/QrCode';
import WindowText from '../../components/WindowText';
require('./index.css');

class CheckOut extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            isSuccess:true
        };
        this.orderStatusApi = 'http://www.mjitech.com/web/seller_api/wx_order_status.action';
        this.sleepTime = 5000;
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
        fetch( this.orderStatusApi,
            {
                method: 'POST',
                mode: 'cors',
                Origin: '*',
                body: JSON.stringify({
                    order_number: on || "SO20160912140809001",
                    open_id:"123456"
                })
            })
            .then(response => response.json())
            .then(json => {
                if(json.is_succ) {
                    if(json.order.status === '2') {
                        window.location.href = "http://www.mjitech.com/seller/wx_order_list.html"
                    } else {
                        window.setTimeout( () => this.fetchOrderStatus(), this.sleepTime)
                    }
                }
            })
    }
    
    render(){
        return(
            <div>
                <QrCode order={this.props.order} onFailClick={this.acknowledgedFalse.bind(this)}/>
                <ConfirmWindow windowText={WindowText}
                               isHidden={this.state.isSuccess}
                               hideClick={this.acknowledgedTrue.bind(this)}/>
            </div>
        );
    }
}

export default CheckOut