import React from 'react';
import ReactDOM from 'react-dom';
import Swiper from '../Swiper/index'
require('./index.css')

export default class Banner extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let props = this.props;
        let bannerData = props.bannerData

        let swiperConfig = {

            slidesPerView: 1
        };
        let style = {}
        let items = bannerData.map((item,index)=>{
            return (
                    <img width='100%' style={style} src={require('./images/active_banner.png')} alt="" className="active_bannerImg"/>

            )
        })

        return (
            <div className="active_bannerContainer" id="active_banner">
                <Swiper swiperConfig={swiperConfig} swiperContainer={'swiper1'}>
                    {items}
                </Swiper>
            </div>
        )
    }
}