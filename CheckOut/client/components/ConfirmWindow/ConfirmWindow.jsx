'use static';

import React from 'react';
import Button from '../Button/Button.jsx';
require('./index.css');
export default class ConfirmWindow extends React.Component {
	constructor(props){
		super(props);
		this.state={
			hidden:true
		};
	}

	componentDidMount(){
		this.setState({
			hidden:true
		});
	}

	modelClick(e){
		if(e.target.className=='model'){
			this.hide()
		}
	}
	
	hide() {
		this.setState({
			hidden:true
		});
	}
	
	show() {
		this.setState({
			hidden: false
		})
	}

	successButtonClick(){
		this.hide();
	}

	failedButtonClick(){
		alert('failed');
	}

	render(){
		let windowText = this.props.windowText;
		console.log(this.state.hidden)
		return this.state.hidden ? null:(
			<div className="model" onClick={this.modelClick.bind(this)}>
				<div className="windowWrap">
					<p>{windowText.htmlText}</p>
					<h1>{windowText.htmlOtherText}</h1>
					<Button buttonClass="paySuccess" buttonText="返回" buttonClick={this.successButtonClick.bind(this)}/>
					{/*<Button buttonClass="payFailed" buttonText="支付遇到问题" buttonClick={this.failedButtonClick.bind(this)}/>*/}
				</div>
			</div>
		)
	}
}