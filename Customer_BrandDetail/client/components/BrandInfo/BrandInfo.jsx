'use strict';

require('./index.css');
import React from 'react';
import BrandItem from '../BrandItem/BrandItem'
export default class BrandInfo extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		const iteminfo = props.iteminfo;
		const brandId = props.brandId;
		return (
			<li className="clearfix">
				{
					Object.keys(iteminfo).map(
						(index)=>{
							return <BrandItem key={index} brandId={brandId} iteminfo={iteminfo[index]} itemClick={this.props.addToCart}/>
						}
					)
				}
			</li>
		);
	}
}