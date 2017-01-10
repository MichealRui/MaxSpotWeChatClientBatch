'use strict';
import React, { Component } from 'react';
import HomeHeader from '../HomeHeader/HomeHeader';
import HeaderButton from '../HeaderButton/HeaderButton';
import ProductClass from '../ProductClass/ProductClass';
import HomeMade from '../../HomeMade/HomeMade';
import Banner from '../BannerContainer/bannerContainer';
require ('./index.css');

export default class HomeContainer extends Component {
	constructor(props){
		super(props);
	}

	render(){
		const { data } = this.props;
		return (
			<div className="homeContainer">
				<HomeHeader logo={data.logo} />
				<HeaderButton address={data.address}/>
				<div className="banner">
				</div>
				<ProductClass />
				<HomeMade homeMadeImg={data.homeMadeImg}/>
			</div>
		);
	}
}