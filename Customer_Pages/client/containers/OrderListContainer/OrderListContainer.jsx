"use strict";
import React from 'react';
import {connect} from 'react-redux';
import {initOrderList} from '../../actions/OrderList'
import CustomerOrder from '../../components/OrderListComponents/CustomerOrder/CustomerOrder'
require('./index.css')

class OrderListContainer extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(initOrderList())
    }

    render(){
        const {state,dispatch} = this.props;
        const {orderList } = state;
        const {orders} = orderList
        let listArr = orders && orders.length ?
            orders.map(
                (order,index)=>
                    <CustomerOrder key={index}
                                   orderInfo={order}
                    />
            ) : [];
        return (
            <ul className="orderListContaier">
                {
                    listArr.reverse()
                }
            </ul>
        )
    }
}

function select(store) {
    return Object.assign({},{state:store});
}

export default connect(select)(OrderListContainer)