'use static';

import React from 'react';
import Button from '../../components/Button/Button';
import AccountDisplay from '../../components/AccountDisplay/AccountDisplay';
import TotalProducts from '../TotalProducts/TotalProducts';
import {initPageContent} from '../../actions/index'
require('./index.css');

export default class ConfirmOrder extends React.Component {
	constructor(props){
		super(props);
	}

	componentWillMount() {
        const { dispatch } = this.props;
        dispatch(initPageContent());
	}

	render(){
	    let props = this.props.confirmOrder;
        let productItems = [];
		props.productItems.map((productItem, index)=>productItems.push(<TotalProducts key={index} productItem={productItem}/>));
		return(
			<div className='orderDetailContainer'>
				<div className="buttonArea clearfix">
					<span className='font14'>剩余支付时间： {props.remainTime}</span>
				</div>
				{productItems}
				<div className="totalArea">
					<AccountDisplay name='商品总金额' money='200'/>
					<AccountDisplay name='商品优惠总计' money='-18'/>
					<AccountDisplay name='总金额优惠总计' money='-10'/>
				</div>
				<p className='font14 totalMoney'>
					<AccountDisplay name='应付金额' money={props.totalMoney}/>
				</p>
				<Button buttonClassName={'weiXinPay'} buttonText={'微信支付'+props.totalMoney+'元'} />
			</div>
		);
	}
}