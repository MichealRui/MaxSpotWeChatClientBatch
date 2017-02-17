'use strict';

require ('./index.css');
import React from 'react';
import {Link} from 'react-router'
export default class ShopItem extends React.Component {
	constructor(props){
		super(props);
	}

    shopClick() {
        let id = this.props.id;
        // window.location.href = ENV.domain + '/buyer_shopdetail/index.html?storeid=' + id
		window.location.href = ENV.domain + '/buyer_home/index.html?storeid=' + id
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
		return (
			<Link to={"/"+ this.props.id}>
				<div className='shopItem'>
					<img src={ENV.domain + '/' + props.imagePath} className='shopImg' />
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


