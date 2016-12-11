'use strict';
import React from 'react'
import ReactQrCode from 'qrcode.react'

export default class QrContent extends React.Component {
    constructor(props) {
        super(props)
    }

    fetchOrderStatus() {
        let {order, fetchOrder} = this.props;
        let PAID = '2';
        if(order.status != PAID) {
            fetchOrder(order.orderNumber);
            window.setTimeout( () => this.fetchOrderStatus(), this.state.sleepTime)
        } else {

        }
    }

    render () {
        let qr = this.props.qr;
        let order=  this.props.order
        return (
            <div>
                <ReactQrCode value={qr}/>
            </div>
        )
    }
}