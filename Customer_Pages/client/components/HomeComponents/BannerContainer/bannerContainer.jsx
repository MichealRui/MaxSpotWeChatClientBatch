'use strict';
import React from 'react'
import {Link} from 'react-router'
import SwiperComponent from '../../CommonComponents/Swiper/index'

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
        let domain = ENV.domain;
        // domain = 'http://114.215.143.97';
        let defaultImg = DEFALUT_INFO.bannerDefaultImg;
        let banners = props.bannerData.map((banner, index) =>  {
            return (
                <Link key={index} to={"/bannerDetail/" + props.storeData.id + "/" + banner.campaignId}>
                    {
                        banner.imagePath ?
                            <img width="100%"  style={style} src={domain + banner.imagePath} alt=""/> :
                            <img width="100%"  style={style} src={defaultImg} alt=""/>
                    }
                </Link>
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
    swiperClass : React.PropTypes.string,
    storeData : React.PropTypes.object
};

BannerContainer.defaultProps= {
    bannerData:[],
    swiperClass : '',
    storeData : {
        id : 0
    }
};