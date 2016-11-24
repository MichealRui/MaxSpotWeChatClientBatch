'use strict';
import React from 'react';
import BannerItem from '../../components/BannerItem/BannerItem';
import Header from '../../components/header/header';
import Timer from '../../components/timer/timer';
import { connect } from 'react-redux';
import Util from '../../util/WeChatUtil';
import {initBanner,initStart,initSuccess,initFail,addToCart} from '../../actions/index'
require('./index.css');
class BrandContainer extends React.Component {
	constructor(props){
		super(props);
	}
	componentWillMount(){
	    let param = Util.getUrlParam();
		let brandId = param.brandid;
		let storeId = param.storeid;
		const {dispatch} = this.props;
		dispatch(initBanner(brandId,storeId));
	}
	render(){
		const{dispatch,itemInfo} = this.props;
        console.log(itemInfo);
		return(
			<div className='brandContainer'>
				<Header/>
				{/*<div className="storeinfo"><p className="font12">{itemInfo.brand.story}</p></div>*/}
				<div className="iteminfo">
					<ul>
						{
							itemInfo.skus.map(
								(item,index)=>{
									return <BrandItem key={index} iteminfo={item} addToCart={(item) => dispatch(addToCart(item))}/>
								}
							)
						}
					</ul>
				</div>
				<Timer iteminfo={itemInfo}></Timer>
			</div>
		)
	}
}

function select(state) {
	return {
		itemInfo:state
	}
}

export default connect(select)(BrandContainer)