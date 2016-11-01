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
		console.log(props);
		const iteminfo = props;
		return (
			<li className="clearfix">
				{
					Object.keys(iteminfo).map(
						function(index){
							<BrandItem key={index} {...iteminfo[index]}/>
						}
					)
				}
			</li>
		);
	}
}