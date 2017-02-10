'use strict';

import React from 'react';
import Header from '../../components/Header/Header';
import OrderItem from '../../components/OrderItem/OrderItem';
import Util from  '../../util/WeChatUtil'

import { connect } from 'react-redux';
import {initPaySuccess,initStart,initSuccess} from '../../actions/index'
require('./index.css');

class PaySuccess extends React.Component {
	constructor(props){
		super(props);
	}

	componentWillMount() {
		const { dispatch } = this.props;
		dispatch(initPaySuccess());
	}

	render(){
		let orderNumber = Util.getUrlParam().ordernumber;
		const { dispatch, itemInfo} = this.props;
		const orderList = itemInfo.childOrders || itemInfo.order;
        var subOrders='';
        if(orderList && orderList.length > 0) {
            subOrders = orderList.map((order, index)=>{
                return <OrderItem key={index} {...order} />
            })
        }
		return (
			<div className='PaySuccessContainer'>
				<Header
					orderLength={orderList.length || 0}
					orderNumber={orderNumber}
				/>
				<ul>
                    {subOrders}
				</ul>
			</div>
		);
	}
}


function select(state) {
	return {
		itemInfo: state
	}
}

export default connect(select)(PaySuccess)