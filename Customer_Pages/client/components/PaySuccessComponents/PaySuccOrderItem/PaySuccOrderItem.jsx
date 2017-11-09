'use strict';

require('./index.css');
import React from 'react';
import {Link} from 'react-router'
import Button from '../../CommonComponents/Button/Button'

export default class PaySuccOrderItem extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		let storename = props.orderInfo ? (
            props.orderInfo.store ? (props.orderInfo.store.name ? props.orderInfo.store.name : '') : ''
		) : '';
        let orderNumber = props.orderInfo ? (
            props.orderInfo.orderNumber ? props.orderInfo.orderNumber : '') : '';
		return (
			<li className='PaySuccOrderItem clearfix'>
				<div className='fl orderInfo'>
					<div className='address font14'>{storename}</div>
					<div className='code font14 c_999'>订单号：{orderNumber}</div>
				</div>
				<div className='fr orderAction'>
					{
						props.orderInfo && props.orderInfo.orderNumber ?
							<Link to={"/takeGoods/"+props.orderInfo.orderNumber}>
								<Button buttonClassName="btn_fetch" buttonText="立即取货"/>
                                {/*<div className=' btn_fetch font14 action1'>立即取货</div>*/}
							</Link> :
							null
					}

					{/*<div className="fr font20 action2 hide"> > </div>*/}
				</div>
			</li>
		);
	}
}

PaySuccOrderItem.PropTypes = {
	orderInfo : React.PropTypes.object
};
PaySuccOrderItem.defaultProps = {
	orderInfo : {
		orderNumber : '',
		store : {
			name : ''
		}
	}
}