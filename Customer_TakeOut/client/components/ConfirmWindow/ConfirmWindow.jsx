'use strict';

import React from 'react';
import Button from '../Button/Button.jsx';
require('./index.css');
export default class ConfirmWindow extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let windowText = this.props.windowText;
		return this.props.isHidden ? null:(
			<div className="model" onClick={this.props.hideClick}>
				<div className="windowWrap">
					<p className='font16'>{windowText.htmlText}<br></br>{windowText.htmlTextBr}</p>
					<h1 className='font26'>{windowText.htmlOtherText}</h1>
					<Button buttonClass="paySuccess" buttonText="拨打电话" buttonClick={this.props.hideClick}/>
					<Button buttonClass="payFailed" buttonText="返回" buttonClick={this.props.hideClick}/>
					{/*<Button buttonClass="payFailed" buttonText="支付遇到问题" buttonClick={this.failedButtonClick.bind(this)}/>*/}
				</div>
			</div>
		)
	}
}