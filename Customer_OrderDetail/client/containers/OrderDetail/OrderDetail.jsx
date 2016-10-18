'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from '../../components/Button/Button';
import OrderDetailTitle from '../../components/OrderDetailTitle/OrderDetailTitle';
import OrderDetailProductList from '../../components/OrderDetailProductList/OrderDetailProductList';
import * as Actions from '../../actions/index';
require('./index.css');

class OrderDetail extends React.Component {
	constructor(props){
		super(props);
	}

	componentWillMount(){
	    const {actions} = this.props;
        actions.initStart();
        actions.initOrderDetail(window.order_id);
    }

	render(){
		let {orderDetail, actions} = this.props;
        let order_id = window.order_id;
		return(
			<div className='orderDetailContainer'>
				<div className="buttonArea clearfix">
                    <span className='font14'>取货时请记得确认位置哦</span>
					<Button buttonClassName='pickUpButton' buttonClick={(order_id)=>Actions.pickUp(order_id)} buttonText='立即取货'/>
				</div>
				<OrderDetailTitle orderTitleIcon={'fa-th-large'} orderTitleText={orderDetail.orderAddress}/>
				<OrderDetailTitle orderTitleIcon={'fa-map-marker'} orderTitleText={orderDetail.orderAddress}/>
				<div className='timeAndMobile'>
					<div className='orderTime'>
						<span className={"fa font20 fa-clock-o"}></span>
						<span className="time font14">08:00 - 23:00</span>
					</div>
					<div className='orderMobile'>
						<span className={"fa font20 fa-phone"}></span>
						<span className="mobile font14">{orderDetail.orderContactMobile}</span>
					</div>
				</div>
				<div className='orderDetailNumber orderDetailInfo font14'>
					<span>订单编号</span>
					<span className='orderNumber'>{orderDetail.orderNumber}</span>
					<span className={orderDetail.orderStatusClass+' orderStatus'}>{orderDetail.orderStatus}</span>
				</div>
				<div className='orderDetailDate orderDetailInfo font14'>
					<span>交易时间</span>
					<span className='last'>{orderDetail.orderDate}</span>
				</div>
				<div className='orderDetailLastDate orderDetailInfo font14'>
					<span>最晚提货时间</span>
					<span className='last'>{orderDetail.orderLastDate}</span>
				</div>
				<div className='orderCode orderDetailInfo font14'>
					<span>取货码</span>
					<span className='code last'>{orderDetail.orderCode}</span>
				</div>
				<OrderDetailProductList orderDetailProductList={orderDetail.orderDetailProductList} totalMoney={orderDetail.totalMoney}/>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
        orderDetail:state
	};
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);