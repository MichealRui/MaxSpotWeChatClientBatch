'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ShopItem from '../../components/ShopItem/ShopItem';
import * as Actions from '../../actions/index';
import Util from '../../util/WeChatUtil';
require ('./index.css');

class SwitchShop extends Component {
	constructor(props){
		super(props);
	}

	componentWillMount(){
		let param = Util.getUrlParam();
		let storeId = param.storeid;
	    let {actions} = this.props;
        actions.initShopList(storeId);
    }

	render(){
		let {Shops, actions} = this.props;
		let currentShop = Shops.current.map((shop, index)=> {
            return <ShopItem key={index} {...shop} />;
        });
        let otherShop = Shops.others.map((shop, index) => {
            return (
                <li key={index}>
                    <ShopItem  {...shop} />
                </li>
            );
        });
		return (
			<div className='shopContainer'>
                {
                    currentShop.length ? (<div className="currentShop">
                        <h1 className='current font16'>当前站点：</h1>
                        {currentShop}
                    </div>) : ''
                }

				<div className="otherShop">
					<h1 className='other font16'>选择一个站点购买：</h1>
					<ul>
						{otherShop}
					</ul>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		Shops: state
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SwitchShop);

