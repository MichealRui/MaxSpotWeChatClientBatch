'use strict';

require('./index.css');
import React from 'react';

export default class timer extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		const item = props.iteminfo;
		return (
			<div className={item.total? "timer" : "timer empty"}>
				<div className="number">{item.total}</div>
				<div className="lasttime">
					<p>剩余时间</p>
					<p>10:10</p>
				</div>
			</div>

		);
	}
}