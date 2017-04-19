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
        let channelData = props.channelData;
        let domain= IMAGECONFIG.host;
        let defPic = './images/banner_default.png';
        let swiperConfig = {
            pagination: '.swiper1 .swiper-pagination',
            freeMode: false,
            slidesPerView: 1,
            spaceBetween: 0,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            // observeParents:true,//修改swiper的父元素时，自动初始化swiper
        };
        // let style = {width:'100%',height:'315px'};
        let style = {width:'100%'};
        let links = bannerData.length>0 ? (
            bannerData.map(
                (img,index)=>{
                    return (
                        <Link key={index} to={"/active/"+ img.campaignId + "/0"}>
                            <img width='100%' className="bannerImg" src={domain + img.imagePath} alt=""/>
                            {/*<img width='100%' className="bannerImg" src="http://test.mjitech.com/images/thanksgiving_banner.jpg" alt=""/>*/}
                        </Link>
                    )
                })
        ) : (
                <Link to="/active/0/0" onClick={() => console.log('header clicked')}>
                    <img width='100%' style={style} src={require(defPic)} alt=""/>
                </Link>
            );

        let channelInfo = channelData.length > 0 ? (
            channelData.map(
                (channel,index) => {
                    if(channel.type){
                        return (
                            <Link to={"/active/0/"+channel.type} key={index}>
                                <div className="newContainer">
                                    <div className="newImgBox">
                                        <img src={domain + channel.imagePath} alt=""/>
                                    </div>
                                </div>
                                <div className="newImgAdd">
                                    {
                                        channel.type == 1 ? <img src={require('./images/NEW_JQ.png')} alt=""/> :
                                            <img src={require('./images/HOT_JQ.png')} alt=""/>
                                    }

                                </div>
                            </Link>
                        )
                    }else{
                        return '';
                    }
                }
            )
        ) : "";

        return (
            <div className="slidingContainer">
                <div className="bannerContainer">
                    <Swiper swiperConfig={swiperConfig} swiperContainer={'swiper1'}>
                        {links}
                    </Swiper>
                </div>
                <div className="moudleContainer">
                    {channelInfo}
                </div>
            </div>
        )
    }
}
