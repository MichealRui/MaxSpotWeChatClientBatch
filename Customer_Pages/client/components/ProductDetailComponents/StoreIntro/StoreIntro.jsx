'use strict';

require ('./index.css');
import React from 'react';
import {Link} from 'react-router'
import util from '../../../util/WeChatUtil';
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
		let brandId = brand.id;
		let storeId = this.props.storeId;
		let defaultImg = DEFALUT_INFO.defaultImg;
		// let domain = ENV.domain;
		let domain = "http://114.215.143.97";
		return (
			<div>
				<p className='storeInfo font12'>{props.productData.description}</p>
				<div className='storeIntroWrap'>
					<Link to={"/brand/"+storeId+"/"+brandId}>
						<div className='storeIntro'>
							{
								props.brandData.imagePath ?
									/*<img src={domain + util.getMiddlePic(props.brandData.imagePath)} className='storeImg'/>*/
									<img src={domain + props.brandData.imagePath} className='storeImg'/>
															:
									<img src={defaultImg} className='storeImg'/>

							}
							<div className="storeIntroInfo">
								<h1 className='font14'>{props.brandData.name}</h1>
								<p className='font12'>{props.brandData.story}</p>
							</div>
							<span className='fa fa-angle-right orderDetailArrow font28'></span>
						</div>
					</Link>
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
		imagePath :'',
		name : '',
		story: '',
		id : 0
	}
}