'use strict';

import React from 'react';
import Swiper from 'swiper';
require('./index.css');
require('./swiper.css');

export default class ProductSlider extends React.Component {
	constructor(props){
		super(props);
	}

    componentDidMount(){
	    window.onload = function(){
	        setTimeout(function(){
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    freeMode: false,
                    slidesPerView: 1
                });
            },100);
        };
    }

	render(){
		let sliders = [];
		let productImgs = this.props.productImgs;
		productImgs.map((img, index)=>{
			sliders.push(
			    <div className="swiper-slide" key={index}>
                    {
                        img.length == 0 ?
                            <img src={require('./images/default.png')}/> :
                            <img src={ENV.domain + img}/>
                    }

                </div>);
		});
		return (
			<div className="productSliderContainer">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {sliders}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
			</div>
		);
	}
}