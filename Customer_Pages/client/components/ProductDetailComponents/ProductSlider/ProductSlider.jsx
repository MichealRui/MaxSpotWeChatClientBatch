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
			pagination:'.swiper-pagination',
			slidesPerView:1,
			freeMode: false
		}
		let props = this.props;
		let productImgs = props.sliderData.images;
		let sliders = productImgs.map(
			(img,index)=>{
				return (
					<div className="swiper-slide" key={index}>
						<img src={ENV.domain + this.getMiddlePic(img) || require('./images/default.png')} alt=""/>
					</div>
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