'use strict';

require ('./index.css');
import React from 'react';
import {Link} from 'react-router'
import util from '../../../util/WeChatUtil';
import LazyLoad from 'react-lazy-load';

export default class ShopItem extends React.Component {
	constructor(props){
		super(props);
	}

    shopDetailClick(event){
		event.preventDefault();
		event.stopPropagation();
    	let id = this.props.id;
		// window.location.href = ENV.domain + '/buyer_shopdetail/index.html?storeid=' + id
		this.context.router.push("/shopDetail/" + id);
	}

	render(){
		let props = this.props;
		let defaultImg = DEFALUT_INFO.defaultImg;
		let domain = ENV.domain;
		domain = "http://114.215.143.97/";
		return (
			<Link to={"/"+ this.props.id}>
				<div className='shopItem'>
					{
						props.imagePath ? <img src={domain+ util.getMiddlePic(props.imagePath)} className='shopImg' /> :
							<img src={defaultImg} className='shopImg' />
					}
					<div className='infoArea'>
						<h1 className='font15'>{props.name}
							<span className="font14 icon1 getStoreInfo" onClick={this.shopDetailClick.bind(this)}>i</span>
						</h1>
						<p className='font12'>{props.address}</p>
					</div>
					<span className=""> <img src={require('./images/arrow.png')} alt=""/> </span>
					{/*<span className='fa fa-angle-right orderAddressArrow font24'></span>*/}
				</div>
			</Link>
		);
	}
}
ShopItem.contextTypes = {
	router: React.PropTypes.object
}


