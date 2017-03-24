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
        return (
            <div className="paySuccessContainer">
                <div>
                    <Header />
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