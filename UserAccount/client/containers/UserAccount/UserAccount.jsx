'use strict';

import React from 'react';
import UserProfile from '../../components/UserProfile/UserProfile';
import UserLink from '../../components/UserLink/UserLink';
import UserResource from '../../components/UserResource/UserResource';
import UndoItem from '../../components/UndoItem/UndoItem';
import UserAccountData from './UserAccountData';
require('./index.css');

export default class UserAccount extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props.orderDetail;
		props = UserAccountData;
		return (
			<div className='UserAccountContainer'>
				<UserProfile userImg={props.userImg} userName={props.userName} />
				<UserResource userResource={props.userResource} />
				<UserLink linkName={'我的订单'} actionName={'查看全部订单'} />
				<UndoItem undoItems={props.undoItems} />
				<UserLink linkName={'收藏的商品'} actionName={''} />
				<UserLink linkName={'收藏的店铺'} actionName={''} />
				<UserLink linkName={'退款记录'} actionName={''} />
			</div>
		);
	}
}