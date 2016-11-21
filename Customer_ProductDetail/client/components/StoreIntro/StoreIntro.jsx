'use strict';

require ('./index.css');
import React from 'react';

export default class StoreIntro extends React.Component {
	constructor(props){
		super(props);
	}

	brandClick() {
	    let domain  = ENV.domain;
	    window.location.href = domain + '/buyer_brand/index.html?brandid='
        + this.props.brand.id + '&storeid=' + this.props.storeId
    }

	render(){
		let props = this.props.brand;
		return (
			<div className='storeIntro' onClick={() => this.brandClick.bind(this)}>
                {
                    props.imagePath.length == 0 ?
                        <img src={require('./images/default.png')} className='storeImg'/> :
                        <img src={props.imagePath} className='storeImg'/>
                }

				<div className="storeIntroInfo">
					<h1 className='font14'>{props.name}</h1>
					<p className='font12'>{props.story}</p>
				</div>
				<span className='fa fa-angle-right orderDetailArrow font28'></span>
			</div>
		);
	}
}