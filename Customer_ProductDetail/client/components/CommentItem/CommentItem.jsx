'use strict';

import React, { Component } from 'react';
require('./index.css');

export default class CommentItem extends Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<div className="commentItem">
				<img src={props.commentImg} className='commentImg'/>
				<div className="content">
					<h1 className="userName font12">{props.userName}</h1>
					<p className="userComment font14">{props.userComment}</p>
				</div>
				<span className="commentDate font12">{props.commentDate}</span>
			</div>
		);
	}
}