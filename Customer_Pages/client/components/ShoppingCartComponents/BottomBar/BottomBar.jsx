'use strict';
import React from 'react';
import fetch from 'isomorphic-fetch';
import Counter from '../Counter/Counter';
require('./index.css');

export default class BottomBar extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.order_number){
			this.context.router.push("/confirmOrder/"+nextProps.order_number);
		}
	}

	
	createOrderClick() {
		let stores =  this.props.activateStore.filter(
		    shop => {
                let id = Object.keys(shop).shift();
                // return shop[id].activated && !shop[id].editable
                return shop[id].activated
		    }
        ).map(s => Object.keys(s).shift());
        if(this.props.totalMoney == 0) {
            return false;
        }
        this.props.submitCart(stores);
	}

	render(){
		let props = this.props;
		return(
			<div className='bottomBar'>
				<div>
					<div>
						<p className='totalMoney font14'>总金额：<em>{props.totalMoney || 0}</em><i>元</i></p>

						<p className='remainTime font14'>
                            {/*<span>剩余时间：</span>*/}
                            {/*<Counter remainTime={props.remainTime}*/}
                                     {/*timeUpCallback={props.clearCart}*/}
                            {/*/>*/}
						</p>

					</div>
				</div>
				<span className={"button settleButton J_createOrder font18 " + (props.totalMoney == 0 ? 'disabled': '') }
                      onClick={this.createOrderClick.bind(this)}
                      disabled={props.totalMoney <= 0}
                >结算</span>
			</div>
		)
	}
}

BottomBar.PropTypes = {
	totalMoney : React.PropTypes.number,
	activateStore : React.PropTypes.object,
	order_number : React.PropTypes.string,
};

BottomBar.defaultProps = {
	totalMoney:0,
	activateStore:{},
	order_number:''
};

BottomBar.contextTypes = {
	router : React.PropTypes.object
}
