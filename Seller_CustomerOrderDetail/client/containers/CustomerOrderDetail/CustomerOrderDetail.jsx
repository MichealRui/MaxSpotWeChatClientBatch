'use strict';

import React from 'react';
import fetch from 'isomorphic-fetch';
import Button from '../../components/Button/Button';
import OrderDetailProductList from '../../components/OrderDetailProductList/OrderDetailProductList';
import CustomerOrderDetailData from './CustomerOrderDetailData';
require('./index.css');

export default class CustomerOrderDetail extends React.Component {
	constructor(props){
		super(props);
        this.state = {
            showBtn: true
        }
	}

	takeGood(on) {
	    fetch('http://www.mjitech.com/web/seller_api/wx_set_order_taken.action',
            {
                method: 'POST',
                mode: 'cors',
                Origin: '*',
                body: JSON.stringify(
                    {order_number: on}
                )
            }
        ).then(response =>response.json())
            .then(json => {
                if(json.is_succ) {
                    this.setState(
                        {
                            showBtn: false
                        }
                    )
                }
            }).catch(e => console.log(e))
    }

	render(){
		let props = this.props.orderDetail;
        let btnArea;
        if(props && props.status == 4 && this.state.showBtn) {
            btnArea = <div className="buttonArea">
                <Button buttonClassName='confirmPickUp'
                        buttonClick={() => this.takeGood(props.orderNumber).bind(this)}
                        buttonText='确认取货'/>
            </div>
        } else {
            btnArea=''
        }
		return(
			<div className='orderDetailContainer'>
                {btnArea}
				{/*<div className="buttonArea">*/}
					{/*<Button buttonClassName='confirmPickUp' buttonClick={()=>console.log('success')} buttonText='确认取货'/>*/}
				{/*</div>*/}
				{/*<div className='orderDetailTitle'>*/}
					{/*<span className="fa fa-th-large font20"></span>*/}
					{/*<span className="orderAddress font14">{props.orderAddress}</span>*/}
					{/*<span className='fa fa-angle-right orderAddressArrow font24'></span>*/}
				{/*</div>*/}
				<div className='orderDetailNumber orderDetailInfo font14'>
					<span>订单编号</span>
					<span>{props.orderNumber}</span>
				</div>
				<div className='orderDetailDate orderDetailInfo font14'>
					<span>交易时间</span>
					<span>{props.sellTime}</span>
				</div>
				{/*<div className='orderDetailLastDate orderDetailInfo font14'>*/}
					{/*<span>最晚提货时间</span>*/}
					{/*<span>{props.orderLastDate}</span>*/}
				{/*</div>*/}
				<div className='orderStatus orderDetailInfo font14'>
					<span>交易状态</span>
					<span>{props.payStatusName}</span>
				</div>
				<OrderDetailProductList orderDetailProductList={props.skus} totalMoney={props.totalPrice || 0}/>
			</div>
		);
	}
}