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
        + this.props.brandData.id + '&storeid=' + this.props.storeId
    }

	render(){
		let props = this.props;
		let brand = props.brandData;

		return (
			<div>
				<p className='storeInfo font12'>{props.productData.description}</p>
				<div className='storeIntroWrap'>
					<div className='storeIntro' onClick={this.brandClick.bind(this)}>
						<img src={props.brandData.imagePath || require('./images/default.png')} className='storeImg'/>
						<div className="storeIntroInfo">
							<h1 className='font14'>{props.brandData.name}</h1>
							<p className='font12'>{props.brandData.story}</p>
						</div>
						<span className='fa fa-angle-right orderDetailArrow font28'></span>
					</div>
				</div>
			</div>
		);
	}
}
StoreIntro.propTypes = {
	productData:React.PropTypes.object,
	brandData:React.PropTypes.object
}
StoreIntro.defaultProps = {
	productData : {
		description : ''
	},
	brandData : {
		imagePath :[],
		name : '',
		story: '',
		id : 0
	}
}