'use static';

import React from 'react';
import BrandInfo from '../../components/BrandInfo/BrandInfo';
import Header from '../../components/header/header';
import Timer from '../../components/timer/timer';
import { connect } from 'react-redux';
import {initBrand,initStart,initSuccess,initFail,addToCart} from '../../actions/index'
require('./index.css');

class BrandContainer extends React.Component {
	constructor(props){
		super(props);
	}
	componentWillMount(){
		const {dispatch} = this.props;
		dispatch(initBrand());
	}
	render(){
		const{dispatch,itemInfo} = this.props;
		const itemMethod = {
			addToCart:item=>dispatch(addToCart())
		}
		return(
			<div className='brandContainer'>
				<Header iteminfo={itemInfo}/>
				<div className="storeinfo"><p>{itemInfo.intro}</p></div>
				<ul>
					{
						itemInfo.info.map(
							(item,index)=>{
								return <BrandInfo key={index} iteminfo={item} itemMethod={itemMethod}/>
							}
						)
					}
				</ul>
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