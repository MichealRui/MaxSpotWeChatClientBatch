import React from 'react';
import {Link} from 'react-router';
import Swiper from '../../components/Swiper/index'
require('./index.css')

export default class Banner extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let props = this.props;
        let bannerData = props.bannerData

        let swiperConfig = {
            pagination: '.swiper1 .swiper-pagination',
            slidesPerView: 1
        };
        let style = {}
        let items = bannerData.map((item,index)=>{
            return (
                <Link key={index} to="/active">
                    <img width='100%' style={style} src={require('./images/banner_default.png')} alt=""/>
                </Link>
            )
        })

        return (
            <div className="bannerContainer">
                <Swiper swiperConfig={swiperConfig} swiperContainer={'swiper1'}>
                    {items}
                </Swiper>
            </div>
        )
    }
}