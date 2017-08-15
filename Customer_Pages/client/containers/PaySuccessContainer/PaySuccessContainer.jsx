"use strict";
import React from 'react';
import { connect } from 'react-redux';
import {InitPaySuccess} from '../../actions/PaySuccess'
import Header from '../../components/PaySuccessComponents/PaySuccessHeader/PaySuccessHeader'
import OrderList from '../../components/PaySuccessComponents/PaySuccessOrderList/PaySuccessOrderList'
class PaySuccessContainer extends React.Component {
    constructor(props){
        super(props);
        this._ordernumber = this.props.params.orderNumber;
    }

    componentWillMount(){
        const {dispatch,state} = this.props;
        dispatch(InitPaySuccess(this._ordernumber))
    }

    render(){
        const {state} = this.props;
        const {paySuccess} = state;
        const {order} = paySuccess;
        let orderNum = 0 ;
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