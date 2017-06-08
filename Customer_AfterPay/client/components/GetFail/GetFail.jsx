'use strict';

require('./index.css');
import React from 'react';
import failImg from '../GetSku/images/wrong.png';

export default class StateInfo extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		let{addLike,itemInfo} = this.props;
		return (
			<div className="state_info get_fail">
				<div className='icons'>
					<i></i>
					<img src={failImg} alt="" />
				</div>
				<div className='text font16'>
					<p>哎呀 出了些小插曲，请尝试重新取</p>
				</div>
				<div className="button font16">给小Max点个赞</div>
			</div>
		);
	}
}