'use strict';

import React from 'react';
import PopUp from '../../CommoonComponents/PopUp/PopUp';
import Button from '../../CommoonComponents/Button/Button';
require('./index.css');
export default class ConfirmWindowComponent extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let windowText = this.props.windowText;

		let Info = (
			<div>
				<div className="shop_errTop">
					<img src={require('./images/p-icon.png')} alt=""/>
				</div>
				<h2 className="font18">{windowText.htmlText}</h2>
				<p className="font14 ">{windowText.htmlTextBr}</p>
				<p className="color29c6e1">{windowText.htmlOtherText}</p>
				<Button buttonClassName="shop-errOK" buttonText="拨打店长电话" buttonClick={this.props.hideClick}/>
			</div>
		);
		return(
			this.props.isHidden ? null:(<PopUp modelClass="ConfirmWindow" htmlText={Info} hideClick={this.props.hideClick}/>)
		)
	}
}