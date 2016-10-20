'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ShopItem from '../../components/ShopItem/ShopItem';
import Shops from './Shops';
import * as Actions from '../../actions/index';
require ('./index.css');

class SwitchShop extends Component {
	constructor(props){
		super(props);
	}

	componentWillMount(){
	    let {actions} = this.props;
        actions.initShopList();
    }

	render(){
		let {Shops, actions} = this.props;
		let currentShop = [];
		let otherShop = [];
		Shops.map((shop, index)=>{
		    let shop_id = shop.id;
			if(shop.current){
				currentShop.push(<ShopItem key={index} {...shop} onClick={()=>actions.switchShop(shop_id)}/>);
			}else {
				otherShop.push(<li><ShopItem key={index} {...shop} onClick={()=>actions.switchShop(shop_id)}/></li>);
			}
		});
		return (
			// <div className='shopContainer'>
			// 	<div className="currentShop">
			// 		<h1 className='current font16'>当前站点：</h1>
			// 		{currentShop}
			// 	</div>
			// 	<div className="otherShop">
			// 		<h1 className='other font16'>去其他站点购买：</h1>
			// 		<ul>
			// 			{otherShop}
			// 		</ul>
			// 	</div>
			// </div>
			<div className='shopContainer'>
				{/*<div className="currentShop">*/}
					{/*<h1 className='current font16'>怪兽家站点：</h1>*/}
					{/*{currentShop}*/}
					{/*{otherShop}*/}
				{/*</div>*/}
				<div className="otherShop">
					<h1 className='other font16'>怪兽家站点：</h1>
					<ul>
						{currentShop}
						{otherShop}
					</ul>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		Shops: state.shopList
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SwitchShop);

