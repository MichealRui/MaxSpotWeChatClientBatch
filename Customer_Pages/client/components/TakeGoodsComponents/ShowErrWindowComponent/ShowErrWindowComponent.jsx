'use strict';

import React from 'react';
import PopUp from '../../CommonComponents/PopUp/PopUp';
import Button from '../../CommonComponents/Button/Button';
require('./index.css');
export default class ShowErrWindowComponent extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		//let windowText = this.props.windowText;
		let props = this.props;
		let address = props.order.store.address;
		let storeAddress = address ? address.substring(address.indexOf("（")+1,address.indexOf("）")) : '';
		let Info = (
			<div className="shop_err">
				<div className="shop_errTop">
					<img src={require('./images/top_icon.png')} alt="" className="top-icon"/>
				</div>
				<h2 className="font18">进错店了！</h2>
				<h5 className="font14">这个订单的取货店铺不在这里</h5>
				<div className="line"></div>
				<div className="localinfo clearfix">
					<div className="tips_text font12">
						<span className="fa fa-map-marker local_icon font14"></span>
						您所在的店铺:
					</div>
					<div className="address font14">光华路SOHO2期光华路SOHO2期</div>
				</div>
				<div className="localinfo clearfix">
					{/*<span className="fa fa-file-text local_icon font20"></span>*/}
					<div className="tips_text font12">
						<span className="fa fa-file-text local_icon font14"></span>
						此订单的店铺:
					</div>
					<div className="address font14">{storeAddress}</div>
				</div>
				{/*<h3 className="local"><img src={require('./images/se_icon1.png')} alt="" />您所在的店铺&nbsp;&nbsp;<p>光华路SOHO2期光华路SOHO2期</p></h3>*/}
				{/*<h3 className="should-local"><img src={require('./images/se_icon2.png')} alt="" />此订单的店铺&nbsp;&nbsp;<p>{props.order.store.name}<br /><span>{storeAddress}</span></p></h3>*/}
				<Button buttonClassName="shop-errOK" buttonText="好的" buttonClick={this.props.hideClick}/>
			</div>
		);
		return(
			this.props.isHidden ? null:(<PopUp modelClass="ShowErrWindow" htmlText={Info} modelClick={this.props.hideClick}/>)
		)
	}
}

ShowErrWindowComponent.PropTypes = {
	order : React.PropTypes.object
}
ShowErrWindowComponent.defaultProps = {
	order : {
		store :{
			name :'',
			address :''
		}
	}
}