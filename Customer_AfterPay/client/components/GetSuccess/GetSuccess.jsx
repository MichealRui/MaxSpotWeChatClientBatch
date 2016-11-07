'use strict';

require('./index.css');
import React from 'react';
import successImg from '../GetSku/images/currect.png';

export default class StateInfo extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		let{addLike,itemInfo} = this.props;
		return (
			<div className="state_info get_success">
				<div className='icons'>
					<i></i>
					<img src={successImg} alt="" />
				</div>
				<div className='text font16'>
					<p>您购买的东西已经全部出货成功了</p>
				</div>
				<div className="button font16" onClick={()=>addLike()}>给小Max点个赞（{itemInfo.count}）</div>
			</div>
		);
	}
}