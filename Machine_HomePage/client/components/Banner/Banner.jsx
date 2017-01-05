import React from 'react';
import {Link} from 'react-router';
import Swiper from '../../components/Swiper/index'
require('./index.css');

export default class Banner extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let props = this.props;
        let bannerData = props.bannerData;
        let defPic = './images/banner_default.png';
        let swiperConfig = {
            pagination: '.swiper1 .swiper-pagination',
            slidesPerView: 1
        };
        let style = {};
        let links = bannerData.length>0 ? (
            bannerData.map(
                (img,index)=>{
                    return (
                        <Link key={index} to="/active">
                            <img width='100%' style={style} src={ENV.domain + img} alt=""/>
                        </Link>
                    )
                })
        ) : (
                <Link to="/active">
                    <img width='100%' style={style} src={require(defPic)} alt=""/>
                </Link>
            );

        return (
            <div className="bannerContainer">
                <Swiper swiperConfig={swiperConfig} swiperContainer={'swiper1'}>
                    {links}
                </Swiper>
            </div>
        )
    }
}