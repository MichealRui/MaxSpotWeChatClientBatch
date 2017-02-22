"use strict";
import React from 'react';
import { connect } from 'react-redux';
import {initPaySuccess} from '../../actions/PaySuccess'
import Header from '../../components/PaySuccessComponents/PaySuccessHeader/PaySuccessHeader'
import OrderList from '../../components/PaySuccessComponents/PaySuccessOrderList/PaySuccessOrderList'
class PaySuccessContainer extends React.Component {
    constructor(props){
        super(props);
        this._ordernumber = this.props.params.orderNumber;
    }

    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(initPaySuccess(this._ordernumber))
    }

    render(){
        const {state,dispatch} = this.props;
        const {paySucc} = state;
        const {order} = paySucc;
        return (
            <div className="paySuccessContainer">
                <Header />
                <OrderList orderList={order}/>
            </div>
        )

    }
}

function select(store) {
    return Object.assign({},{state:store})
}

export default connect(select)(PaySuccessContainer)