'use strict';

import React from 'react';

require('./index.css');
export default class PopUp extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		console.log(this.props);
		return (
			<div className={"model " + this.props.modelClass} onClick={this.props.modelClick}>
				<div className="windowWrap">
					{this.props.htmlText}
					<div className="closeIcon" onClick={this.props.hideClick}>
						<span className="iconfont icon-close font30"></span>
					</div>
				</div>

			</div>
		)
	}
}