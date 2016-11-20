'use strict';
import React from 'react';
import BrandItem from '../../components/BrandItem/BrandItem';
import Header from '../../components/header/header';
import Timer from '../../components/timer/timer';
import { connect } from 'react-redux';
import Util from '../../util/WeChatUtil';
import {initBrand,initStart,initSuccess,initFail,addToCart} from '../../actions/index'
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
		dispatch(initBrand(brandId,storeId));
	}
	render(){
		const{dispatch,itemInfo} = this.props;
		return(
			<div className='brandContainer'>
				<Header iteminfo={itemInfo}/>
				<div className="storeinfo"><p className="font12">{itemInfo.intro}</p></div>
				<div className="iteminfo">
					<ul>
						{
							itemInfo.info.map(
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