'use static';

import React from 'react';
import BrandInfo from '../../components/BrandInfo/BrandInfo';
import header from '../../components/header/header';
import BrandData from './BrandData';
require('./index.css');

export default class Brand extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let props = this.props;
		console.log(props);
		console.log(BrandData);
		return (
			<div className='brandContainer'>
				<header iteminfo={BrandData}/>
				<div className="storeinfo"><p>{BrandData.intro}</p></div>
				<ul>
					{
						BrandData.info.map(
							(item,index)=>{
								return <BrandInfo key={index} {...item} />
							}
						)
					}
				</ul>
			</div>

		);
	}
}