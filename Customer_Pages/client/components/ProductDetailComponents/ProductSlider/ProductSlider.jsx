'use strict';

import React from 'react';
import SwiperComponent from '../../CommonComponents/Swiper/index';

import util from '../../../util/WeChatUtil';
require('./index.css');

export default class ProductSlider extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let swiperConfig = {
			pagination:'.swiper1 .swiper-pagination',
			slidesPerView:1,
			freeMode: false
		}
		let style = {}
		let props = this.props;
		let productImgs = props.sliderData.images;
		let defaultImg = DEFALUT_INFO.defaultImg;
		// let domain = ENV.domain;
		let domain = "http://114.215.143.97/";
		let sliders = productImgs.map(
			(img,index)=>{
                return (
                    img ? <img width="60%" key={index} style={style} src={ domain + util.getMiddlePic(img) } alt=""/>
                    :
                    <img width="60%" key={index} style={style} src={defaultImg} alt=""/>
                )
			}
		)
		return (
			<div className="productSliderContainer">
				<SwiperComponent swiperConfig={swiperConfig}>
					{sliders}
				</SwiperComponent>
			</div>
		);
	}
}

ProductSlider.propTypes = {
	sliderData:React.PropTypes.object
}
ProductSlider.defaultProps = {
	sliderData : {
		images : []
	}
}