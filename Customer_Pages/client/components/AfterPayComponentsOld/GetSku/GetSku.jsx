'use strict';

require('./index.css');
import React from 'react';
import goodImg from './images/good.jpg';

export default class StateInfo extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<div className="state_info get_sku">
				<div className='icons sku'>
					<i></i>
					<img src={goodImg} alt="" />
				</div>
				<div className='text font16'>
					<p>小Max已经在帮你奋力拿货啦，</p>
					<p>很快，不要走开哟</p>
				</div>
				<div className="button font16">给小Max点个赞</div>
			</div>
		);
	}
}