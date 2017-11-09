"use strict";
import React from 'react';
import { connect } from 'react-redux';
import { initWxConfig } from '../../actions/WeiXin';
import { InitPaySuccess } from '../../actions/PaySuccess'
import Header from '../../components/PaySuccessComponents/PaySuccessHeader/PaySuccessHeader'
import OrderList from '../../components/PaySuccessComponents/PaySuccessOrderList/PaySuccessOrderList'
class PaySuccessContainer extends React.Component {
    constructor(props){
        super(props);
        this.defaultStoreId = 13;
        this._ordernumber = this.props.params.orderNumber;
    }

    componentWillMount(){
        const { dispatch } = this.props;
        let i_link = 'http://www.mjitech.com/buyer_pages/index.html/#/';
        dispatch(initWxConfig(i_link,InitPaySuccess(this._ordernumber)));
    }

    render(){
        const {state} = this.props;
        const {paySuccess,content} = state;
        const {order} = paySuccess;
        let storeId = content.storeInfo ? content.storeInfo.id : this.defaultStoreId;
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
                    <Header orderNum={orderNum} storeId={storeId}/>
                    <OrderList orderList={order}/>
                </div>
            </div>
        )

    }
}

function select(store) {
    return Object.assign({}, {state: store})
}
export default connect(select)(PaySuccessContainer)