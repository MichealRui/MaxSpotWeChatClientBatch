import React from 'react';
require('./index.css');

export default class Message extends React.Component {
	constructor(props){
		super(props);
	}

	static defaultProps = {
	    msgContent: {errorMessage:''},
        clearTime: 2000 //default clearTime
    };

	componentWillReceiveProps(nextProps) {
	    let props = this.props;
        window.setTimeout(() => {
		    if(nextProps.msgContent.errorMessage){
                props.clearMessage()
            }
        }, props.clearTime)
	}
	
	render(){
		const {msgContent} = this.props;
		if(msgContent.errorMessage){
			return (
				<div className="message font16">
					<i className="msgIcon">!</i>
					<span className="msgContent">{msgContent.errorMessage}</span>
				</div>
			);
		}else {
			return null;
		}
	}
}