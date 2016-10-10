'use static';

import React from 'react';
import Button from '../../components/Button/Button';
import OrderDetailTitle from '../../components/OrderDetailTitle/OrderDetailTitle';
import OrderDetailProductList from '../../components/OrderDetailProductList/OrderDetailProductList';
import OrderDetailData from './OrderDetailData';
require('./index.css');

export default class OrderDetail extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props.orderDetail;
		props = OrderDetailData;
		return(
			<div className='orderDetailContainer'>
				<div className="buttonArea clearfix">
					<span className='font14'>剩余支付时间：{props.remainTime}</span>
					<Button buttonClassName='pickUpButton' buttonClick={()=>console.log('success')} buttonText='立即取货'/>
				</div>
				<OrderDetailTitle orderTitleIcon={'fa-th-large'} orderTitleText={OrderDetailData.orderAddress}/>
				<OrderDetailTitle orderTitleIcon={'fa-map-marker'} orderTitleText={OrderDetailData.orderAddress}/>
				<div className='timeAndMobile'>
					<div className='orderTime'>
						<span className={"fa font20 fa-clock-o"}></span>
						<span className="time font14">08:00 - 23:00</span>
					</div>
					<div className='orderMobile'>
						<span className={"fa font20 fa-phone"}></span>
						<span className="mobile font14">{OrderDetailData.orderContactMobile}</span>
					</div>
				</div>
				<div className='orderDetailNumber orderDetailInfo font14'>
					<span>订单编号</span>
					<span className='orderNumber'>{props.orderNumber}</span>
					<span className={props.orderStatusClass+' orderStatus'}>{props.orderStatus}</span>
				</div>
				<div className='orderDetailDate orderDetailInfo font14'>
					<span>交易时间</span>
					<span className='last'>{props.orderDate}</span>
				</div>
				<div className='orderDetailLastDate orderDetailInfo font14'>
					<span>最晚提货时间</span>
					<span className='last'>{props.orderLastDate}</span>
				</div>
				<div className='orderCode orderDetailInfo font14'>
					<span>取货码</span>
					<span className='code last'>{props.orderCode}</span>
				</div>
				<OrderDetailProductList orderDetailProductList={props.orderDetailProductList} totalMoney={props.totalMoney}/>
			</div>
		);
	}
}