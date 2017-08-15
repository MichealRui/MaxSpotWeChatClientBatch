"ues strict";

import React from 'react';
import {connect} from 'react-redux';
import {InitOrderDetail} from '../../actions/OrderDetail';
import OrderHeader from '../../components/OrderDetailComponents/OrderDetailHeader/OrderDetailHeader'
import OrderDetailStoreInfo from '../../components/OrderDetailComponents/OrderDetailStoreInfo/OrderDetailStoreInfo'
import OrderDetailOrderInfo from '../../components/OrderDetailComponents/OrderDetailOrderInfo/OrderDetailOrderInfo'
import OrderDetailProductList from '../../components/OrderDetailComponents/OrderDetailProductList/OrderDetailProductList'
class OrderDetailContainer extends React.Component {
    constructor(props){
        super(props);
        this._ordernumber = this.props.params.orderNumber;
    }

    componentWillMount(){
        const {dispatch,state} = this.props;
        const {orderDetail} = state;
        orderDetail.orderNumber && this._ordernumber == orderDetail.orderNumber ? '' : dispatch(InitOrderDetail(this._ordernumber))
        // dispatch(InitOrderDetail(this._ordernumber));
    }

    render(){
        const {state} = this.props;
        const {orderDetail} = state;
        return(
            <div className="orderDetailContainer">
                <OrderHeader orderInfo={orderDetail.order}/>
                <OrderDetailStoreInfo storeInfo = {orderDetail.order}/>
                <OrderDetailOrderInfo orderInfo = {orderDetail.order}/>
                <OrderDetailProductList orderInfo = {orderDetail.order}/>
            </div>
        )
    }
}

function select(store) {
    return Object.assign({},{state:store});
}

export default connect(select)(OrderDetailContainer)