'use static';

import React from 'react';
import Header from '../../components/Header/Header';
import OrderItem from '../../components/OrderItem/OrderItem';
import { connect } from 'react-redux';
import {initPaySuccess,initStart,initSuccess} from '../../actions/index'
require('./index.css');

class PaySuccess extends React.Component {
	constructor(props){
		super(props);
	}
	componentWillMount() {
		console.log(this.props)
		const { dispatch } = this.props;
		dispatch(initPaySuccess());
	}

	render(){
		// let props = this.props.orderDetail;
		// props = CouponData;
		const { dispatch, itemInfo} = this.props;
		const orderList = itemInfo.order
		return (
			<div className='PaySuccessContainer'>
				<Header/>
				<ul>
					{
						orderList.map((order, index)=>{
							return <OrderItem key={index} {...order} />
						})
					}
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