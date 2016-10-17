'use strict';

import React from 'react';
import Header from '../../components/Header/Header';
import Info from '../../components/Info/Info';
import Gallery from '../../components/Gallery/Gallery'
import { connect } from 'react-redux';
import {initShopContent,initStart,initSuccess,addLike,cancelLike} from '../../actions/index'
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
			addlike:item=>dispatch(addLike(item)),
			cancellike : item=>dispatch(cancelLike(item))
		}
		return (
			<div className="shopContainer">
                <Header itemInfo={itemInfo.header} itemMethod={itemMethod}/>
                <Info itemInfo={itemInfo.info}/>
                <Gallery itemInfo={itemInfo.gallery}/>
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