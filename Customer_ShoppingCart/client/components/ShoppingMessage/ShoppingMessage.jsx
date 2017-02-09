import React from 'react';
import icon_metion from './images/icon_metion.png';
import icon_close from './images/icon_close.png';
require('./index.css');

export default class ShoppingMessage extends React.Component {
	constructor(props){
		super(props);
	}


	render(){
		let msgContent = this.props.metionMsg;
		if(msgContent){
			return (
				<div className="shoppingmessage font16">
					<span className="msgMetion">
						<img src={require('./images/icon_metion.png')} alt=""/>
					</span>
					<span className="msgContent">{msgContent}</span>
					<span className="msgClose" onClick={()=>this.props.clearMessage()}>
						<img src={require('./images/icon_close.png')} alt=""/>
					</span>
				</div>
			);
		}else {
			return null;
		}
	}
}