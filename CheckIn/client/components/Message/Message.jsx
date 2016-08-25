import React from 'react';
require('./index.css');

export default class Message extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let msgContent = this.props.msgContent;
		if(msgContent){
			return (
				<div className="message">
					<i className="msgIcon">!</i>
					<span className="msgContent">{msgContent}</span>
				</div>
			);
		}else {
			return null;
		}
	}
}