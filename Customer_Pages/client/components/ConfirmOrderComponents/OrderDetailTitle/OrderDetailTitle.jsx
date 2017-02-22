'use strict';

require('./index.css');
import React from 'react';

export default class OrderDetailTitle extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		return (
			<div className='orderDetailTitle'>
				{/*<span className={"fa font20 " + props.orderTitleIcon}></span>*/}
				<span className="orderAddress font14">{props.orderTitleText}</span>
				{/*<span className='fa fa-angle-right orderAddressArrow font24'></span>*/}
			</div>
		);
	}
}

OrderDetailTitle.PropTypes = {
	orderTitleText : React.PropTypes.string
};
OrderDetailTitle.defaultProps = {
	orderTitleText : ''
};