'use strict';

import React from 'react';
import PopUp from '../../CommonComponents/PopUp/PopUp';
import Button from '../../CommonComponents/Button/Button';
require('./index.css');
export default class ConfirmWindowComponent extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let windowText = this.props.windowText;
		let order = this.props.order;
		let Info = (
			<div>
				<div className="shop_errTop">
					<img src={require('./images/p-icon.png')} alt=""/>
				</div>
				<h2 className="font18">{windowText.htmlText}</h2>
				<p className="font14 ">{windowText.htmlTextBr}</p>
				<p className="color29c6e1">{order.store.phone}</p>
				<a href={"tel:" + order.store.phone}>
					<Button buttonClassName="shop-errOK" buttonText="拨打店长电话" buttonClick=""/>
				</a>

			</div>
		);
		return(
			this.props.isHidden ? null:(<PopUp modelClass="ConfirmWindow" htmlText={Info} hideClick={this.props.hideClick}/>)
		)
	}
}
ConfirmWindowComponent.PropTypes = {
	order : React.PropTypes.object
};
ConfirmWindowComponent.defaultProps = {
	order :{
		store : {
			phone : ''
		}
	}
}