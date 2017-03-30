'use strict';

require('./index.css');
import React from 'react';

export default class Footer extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;

		return (
			<div className="footer font14">
				<p>取货有异常？</p>
				<p>请通过怪兽家便利店微信公众账号</p>
				<p>及时发消息联系我们</p>
			</div>
		);
	}
}