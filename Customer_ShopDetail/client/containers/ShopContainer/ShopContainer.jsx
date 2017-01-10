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
		const store = itemInfo.store
		const itemMethod = {
			changelike:item=>dispatch(changeLike(item)),
		};
		return (
			<div className="shopContainer">
                {
                    store ?
                        (<div>
                            <Header store={store} itemMethod={itemMethod}/>
                            <Info store={store}/>
                            <ul className="imageContainer">
                                {
                                    itemInfo.store.images.map(
                                        (gallery,index) =>
                                            <Gallery key={index} address={gallery}/>
                                    )
                                }
                            </ul>
                        </div>
                        ):''
                }

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