'use strict';

import React from 'react';
import Header from '../../components/Header/Header';
import Info from '../../components/Info/Info';
import Gallery from '../../components/Gallery/Gallery'
require ('./index.css');

export default class ShopContainer extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="shopContainer">
                <Header/>
                <Info/>
                <Gallery />
            </div>
		);
	}
}