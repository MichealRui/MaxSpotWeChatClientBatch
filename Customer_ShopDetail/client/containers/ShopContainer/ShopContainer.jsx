'use strict';

import React from 'react';
import Header from '../../components/Header/Header';
import Info from '../../components/Info/Info';
import Gallery from '../../components/Gallery/Gallery'
import { connect } from 'react-redux';
import {initShopContent,initStart,initSuccess,changeLike} from '../../actions/index'
require ('./index.css');

class ShopContainer extends React.Component {
	constructor(props){
		super(props);
	}
	componentWillMount() {
		const { dispatch } = this.props;
		dispatch(initShopContent());
	}

	render(){

		const { dispatch, itemInfo} = this.props;

		const itemMethod = {
			changelike:item=>dispatch(changeLike(item)),
		}
		return (
			<div className="shopContainer">
                <Header itemInfo={itemInfo.header} itemMethod={itemMethod}/>
                <Info itemInfo={itemInfo.info}/>
				<ul className="imageContainer">
				{
					itemInfo.gallery.map(
					(gallery,index) =>
						<Gallery itemInfo={gallery}/>
					)
				}
				</ul>
            </div>
		);
	}
}

function select(state) {
	return {
		itemInfo: state
	}
}

export default connect(select)(ShopContainer)