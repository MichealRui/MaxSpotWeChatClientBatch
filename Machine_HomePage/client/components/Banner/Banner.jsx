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
        let swiperConfig = {
            pagination: '.swiper1 .swiper-pagination',
            slidesPerView: 1
        };
        let style = {};
        let links = [];
        // links.push(
        //     <Link to="/whole-active" key="activity_xbx">
        //         <img width='100%' style={style} src={require('./images/xbx-banner.jpg')} alt=""/>
        //      </Link>
        // );

        let banner_online = bannerData.map(
            (img,index)=>{
                return (
                    <Link key={index} to="/active">
                        <img width='100%' style={style} src={ENV.domain + img} alt=""/>
                    </Link>
                )
            });
        if(banner_online.length > 0 ){
            links.push(banner_online)
        }else{
            links.push(
                <Link to="/active" key="activity_default">
                    <img width='100%' style={style} src={require('./images/banner_default.png')} alt=""/>
                </Link>
            );

        }

        return (
            <div className="bannerContainer">
                <Swiper swiperConfig={swiperConfig} swiperContainer={'swiper1'}>
                    {links}
                </Swiper>
            </div>
        )
    }
}