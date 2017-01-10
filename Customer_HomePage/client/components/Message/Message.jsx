import React from 'react';
require('./index.css');

export default class Message extends React.Component {
	constructor(props){
		super(props);
	}
	
	componentWillReceiveProps() {
		window.setTimeout(() => {
		    if(this.props.msgContent){
		        this.props.clearMessage()
            }
        }, 2000)
	}
	
	render(){
		let msgContent = this.props.msgContent;
		if(msgContent){
			return (
				<div className="message font16">
					<i className="msgIcon">!</i>
					<span className="msgContent">{msgContent}</span>
				</div>
			);
		}else {
			return null;
		}
	}
}