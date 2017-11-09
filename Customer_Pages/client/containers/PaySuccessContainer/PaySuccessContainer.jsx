"use strict";
import React from 'react';
import { connect } from 'react-redux';
import {InitPaySuccess} from '../../actions/PaySuccess'
import {initWxConfig} from '../../actions/WeiXin'
import Header from '../../components/PaySuccessComponents/PaySuccessHeader/PaySuccessHeader'
import OrderList from '../../components/PaySuccessComponents/PaySuccessOrderList/PaySuccessOrderList'
class PaySuccessContainer extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        let ordernumber = this.props.params.orderNumber;
        const {dispatch} = this.props;
        let i_link = 'http://www.mjitech.com/buyer_pages/index.html/#/';
        dispatch(initWxConfig(i_link,InitPaySuccess(ordernumber)));
    }

    render(){
        const {state} = this.props;
        const {paySuccess} = state;
        const {order} = paySuccess;
        let orderNum = order ? (order.orderNumber ? order.orderNumber : 0 ) : 0 ;
        if(order){
            if(order.childOrders && order.childOrders.length > 0){
                if(order.childOrders.length == 1){
                    orderNum = order.childOrders[0].orderNumber;
                }
            }
        }
        return (
            <div className="paySuccessContainer">
                <div>
                    <Header orderNum={orderNum}/>
                    <OrderList orderList={order}/>
                </div>
            </div>
        )

    }
}

function select(store) {
    return Object.assign({},{state:store})
}

export default connect(select)(PaySuccessContainer)