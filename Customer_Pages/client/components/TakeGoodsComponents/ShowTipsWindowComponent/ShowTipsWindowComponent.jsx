'use strict';

import React from 'react';
import PopUp from '../../CommoonComponents/PopUp/PopUp';
import Button from '../../CommoonComponents/Button/Button';
require('./index.css');
// require('http://at.alicdn.com/t/font_7new117jouqjv2t9.css')
export default class ShowTipsWindowComponent extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let windowText = this.props.windowText;
		let Info = (
			<div>
				<div className="how_top">
					<img src={require('./images/3gif.gif')} alt=""/>
				</div>
				<div className="how_bg">
					<div></div>
				</div>
				<div className="how_text">
					<p className="out-operation">请将手机屏幕对准店铺机身扫描区。扫描成功后，机器件立即将你购买的商品送至取货口。</p>
				</div>
			</div>
		);
		return(
			this.props.isHidden ? null:(<PopUp modelClass="" htmlText={Info} hideClick={this.props.hideClick}/>)
		)
	}
}

