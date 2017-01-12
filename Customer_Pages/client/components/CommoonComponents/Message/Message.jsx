import React from 'react';
require('./index.css');

export default class Message extends React.Component {
	constructor(props){
		super(props);
        this.state={ message:'' }
	}

	static defaultProps = {
	    msgContent: '',
        clearTime: 2000 //default clearTime
    };

	componentWillReceiveProps(nextProps) {
	    let props = this.props;
	    this.setState({
	        message: nextProps.msgContent
        });
        window.setTimeout(() => {
		    if(nextProps.msgContent){
                this.setState( { message:'' } );
            }
        }, props.clearTime)
	}
	
	render(){
		let msgContent = this.state.message;
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