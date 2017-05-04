'use strict';

import React from 'react';
import PopUp from '../../CommonComponents/PopUp/PopUp';
import Button from '../../CommonComponents/Button/Button';
require('./index.css');
export default class WaittingWindowComponent extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let windowText = this.props.windowText;

		let Info = (
			<div className="waiteWrap">
				<div className="shop_errTop">
					<img src={require('./images/p-icon.png')} alt=""/>
				</div>
				<h2 className="font18">请稍后...</h2>
				<p className="font14">上一位顾客正在取货，请您稍后再次扫码取货。</p>
				<Button buttonClassName="shop-errOK" buttonText="好的" buttonClick={this.props.hideClick}/>
			</div>
		);
		return(
			this.props.isHidden ? null:(<PopUp modelClass="WaittingWindow" htmlText={Info} modelClick={this.props.hideClick}/>)
		)
	}
}