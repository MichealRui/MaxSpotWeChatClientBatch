'use strict';
import React from 'react'
import SwiperComponent from '../../CommoonComponents/Swiper/index'

export default class BannerContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let swiperConfig = {
            pagination: '.swiper1 .swiper-pagination',
            slidesPerView: 1
        };

        let props = this.props;
        let style= {};
        let banners = props.bannerData.map((banner, index) =>  {
            return (
                <a key={index} href={banner.destUrl}>
                    <img width="100%"  style={style} src={banner.imagePath || require('./images/banner_default.png')}/>
                </a>
            )
        });
            
        return (
            <SwiperComponent swiperConfig={swiperConfig} swiperContainer={props.swiperClass}>
                {banners}
            </SwiperComponent>
        )
    }
}

BannerContainer.propTypes={
    bannerData:React.PropTypes.array,
    swiperClass : React.PropTypes.string
};

BannerContainer.defaultProps= {
    bannerData:[],
    swiperClass : ''
};