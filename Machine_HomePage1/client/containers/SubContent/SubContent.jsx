'use strict';
import React from 'react'
import Selector from '../../components/Selector/index'
import ItemContainer from '../ItemContainer/itemContainer'
import Swiper from '../../components/Swiper/index'
require('./index.css')
export default class SubContent extends React.Component {
    constructor(props) {
        super(props)
    }

    // shouldComponentUpdate(nextProps){
    //     // return !(JSON.stringify(this.props.contentData.items) == JSON.stringify(nextProps.contentData.items));
    // }



    render() {
        let props = this.props;
        let current = props.contentData;
        let activityData = this.props.activityData;
        let domain= IMAGECONFIG.host;
        let item = activityData.items && activityData.items.length > 0 ? activityData.items : current.items;
        // let bannerData = current.banner && current.banner.length > 0 ? current.banner.map((banners,index)=>{
        //     //domain + banners
        //     return <div className="bannerBorder" key={index}><img className="bannerImg" src={require("./images/1.jpg")} alt=""/></div>
        // }) : [];

        //domain + current.banner
        domain = 'http://test.mjitech.com/';
        let bannerDatas = current.banner ?  <div className="bannerBorder"><img className="bannerImg" src={require('./images/1.jpg')} alt=""/></div> : null;
        let hasBanner = current.banner ? true : false;
        console.warn(hasBanner);
        console.warn(current.banner);
        let swiperConfig = {
            freeMode: false,
            slidesPerView: 1,
            spaceBetween: 0,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            // observeParents:true,//修改swiper的父元素时，自动初始化swiper
        };
        /*
         <Swiper swiperConfig={swiperConfig} swiperContainer={'swipers7'}>
         {bannerData}
         </Swiper>
         */
        return (
            <div className="subContentContainer">
                <Selector selector={this.props.selector}
                          changeContent={this.props.changeContent}
                          currentSelector={this.props.currentSelector}
                          bannerData={this.props.bannerData}
                          channelData = {this.props.channelData}
                          getActivityData={this.props.getActivityData}
                          getChannelData={this.props.getChannelData}
                          isActivity={this.props.isActivity}
                          activeTag={this.props.activeTag}
                />
                {
                    this.props.isActivity ?
                        <div className="subBanner">
                            {bannerDatas}
                        </div> : ''
                }
                <ItemContainer items={current.items}
                               itemClick={props.addToCart}
                               store={props.storeData}
                               detailClick={props.showProduct}
                               reload={true}
                               activityData={props.activityData}
                               isActivity={props.isActivity}
                               cart={props.cart}
                               hasBanner = {hasBanner}
                />
            </div>
        )
    }
}