'use strict';

import React from 'react';
import ShopItem from '../../components/ShopItem/ShopItem';
import Shops from './Shops';
require ('./index.css');

export default class SwitchShop extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props.Shops;
		props = Shops;
		let currentShop = [];
		let otherShop = [];
		Shops.map((shop, index)=>{
			if(shop.current){
				currentShop.push(<ShopItem key={index} {...shop} />);
			}else {
				otherShop.push(<li><ShopItem key={index} {...shop} /></li>);
			}
		});
		return (
			<div className='shopContainer'>
				<div className="currentShop">
					<h1 className='current font16'>当前站点：</h1>
					{currentShop}
				</div>
				<div className="otherShop">
					<h1 className='other font16'>去其他站点购买：</h1>
					<ul>
						{otherShop}
					</ul>
				</div>
			</div>
		);
	}
}