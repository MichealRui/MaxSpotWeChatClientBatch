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
        console.log("bannerData");console.log(bannerData);
        let domain= IMAGECONFIG.host;
        let defPic = './images/banner_default.png';
        let swiperConfig = {
            pagination: '.swiper1 .swiper-pagination',
            slidesPerView: 1
        };
        let style = {width:'100%',height:'315px'};
        let links = bannerData.length>10 ? (
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
            <div className="slidingContainer">
                <div className="bannerContainer">
                    <Swiper swiperConfig={swiperConfig} swiperContainer={'swiper1'}>
                        {links}
                    </Swiper>
                </div>
                <div className="moudleContainer">
                    <div className="newContainer">
                        <div className="newImgBox">
                            <img src={require('./images/new.png')} alt=""/>
                        </div>
                        <div className="newImgAdd">
                            <img src={require('./images/NEW_JQ.png')} alt=""/>
                        </div>
                    </div>
                    <div className="newContainer">
                        <div className="newImgBox">
                            <img src={require('./images/hot.png')} alt=""/>
                        </div>
                        <div className="newImgAdd">
                            <img src={require('./images/HOT_JQ.png')} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}