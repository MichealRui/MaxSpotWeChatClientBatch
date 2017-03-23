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
        let domain= IMAGECONFIG.host;
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
                        <a key={index} href={img.destUrl}>
                            <img width='100%' style={style} src={domain + img.imagePath} alt=""/>
                        </a>
                    )
                })
        ) : (
                <Link to="/active" onClick={() => console.log('header clicked')}>
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