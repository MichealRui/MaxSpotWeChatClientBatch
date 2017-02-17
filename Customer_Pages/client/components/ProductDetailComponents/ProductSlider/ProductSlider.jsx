'use strict';

import React from 'react';
import SwiperComponent from '../../CommoonComponents/Swiper/index';
require('./index.css');

export default class ProductSlider extends React.Component {
	constructor(props){
		super(props);
	}

	getMiddlePic(path) {
		let particial = path.split('.');
		if(particial.length == 2) {
			particial[0] = particial[0] + '_middle'
			return particial.join('.')
		} else {
			path
		}
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
		let sliders = productImgs.map(
			(img,index)=>{
				return (
					<img width="60%" key={index} style={style} src={ ENV.domain + this.getMiddlePic(img) || require('./images/default.png')} alt=""/>
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