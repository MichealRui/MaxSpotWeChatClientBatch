'use strict';
import React from 'react'
import ReactQrCode from 'qrcode.react'

export default class QrContent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            sleepTime:2000,
        }
    }

    fetchOrderStatus() {
        let {order, fetchOrder, setCartQr} = this.props;
        let PAID = '2';
        if(order.status != PAID) {
            fetchOrder(order.orderNumber);
            window.setTimeout( () => this.fetchOrderStatus(), this.state.sleepTime)
        } else {
            setCartQr();
        }
    }

    // componentWillMount() {
    //     this.fetchOrderStatus.bind(this)()
    // }

    render () {
        let qr = this.props.qr;
        return (
            <div onClick={() => this.props.setCartTaking()}>
                <ReactQrCode value={qr}/>
            </div>
        )
    }
}