'use static';

import React from 'react';
import Button from '../Button/Button.jsx';
require('./index.css');
export default class ConfirmWindow extends React.Component {
	constructor(props){
		super(props);
		// this.state={
		// 	hidden: !this.props.isHidden
		// };
	}

	// componentDidMount(){
	// 	this.setState({
	// 		hidden: !this.props.isHidden
	// 	});
	// }
    //
	// modelClick(e){
	// 	if(e.target.className=='model'){
	// 		this.hide()
	// 	}
	// }
	//
	// hide() {
	// 	onFailClick()
	// }
	//
	// show() {
	// 	this.setState({
	// 		hidden: false
	// 	})
	// }
    //
	// successButtonClick(){
	// 	this.hide();
	// }
    //
	// failedButtonClick(){
	// 	alert('failed');
	// }

	render(){
		let windowText = this.props.windowText;
		return this.props.isHidden ? null:(
			<div className="model" onClick={this.props.onFailClick}>
				<div className="windowWrap">
					<p>{windowText.htmlText}</p>
					<h1>{windowText.htmlOtherText}</h1>
					<Button buttonClass="paySuccess" buttonText="返回" buttonClick={this.props.onFailClick}/>
					{/*<Button buttonClass="payFailed" buttonText="支付遇到问题" buttonClick={this.failedButtonClick.bind(this)}/>*/}
				</div>
			</div>
		)
	}
}