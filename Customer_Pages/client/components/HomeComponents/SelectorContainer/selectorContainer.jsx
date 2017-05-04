'use strict';
import React from 'react'
import Selector from '../Selector/index'
import Swiper from '../../CommonComponents/Swiper/index'
import {Link} from 'react-router';
import util from '../../../util/WeChatUtil';
import LazyLoad from 'react-lazy-load';
import BannerContainer from '../BannerContainer/bannerContainer';
require('./index.css');

export default class SelectorContainer extends React.Component {
    constructor(props) {
        super (props);
        this.state={
            activated:[]
        };
        this._onclick = e => {
            let key = e.target.getAttribute("data-key");
            key ? this.props.onSelectClick(key) : false;
        }
    }

    render() {
        let swiperConfig = {
            pagination:'',
            freeMode: false,
            slidesPerView: 5,
            spaceBetween: 0,
        };
        let swiperConfigs = {
            pagination:'',
            freeMode: false,
            slidesPerView: 4,
            spaceBetween: 0,
        };
        let swiperConfigs1 = {
            pagination:'',
            freeMode: false,
            slidesPerView: 2,
            spaceBetween: 0,
        };
        let swiperConfigs2 = {
            pagination:'',
            freeMode: false,
            slidesPerView: 1,
            spaceBetween: 0,
        };
        let swiperContainer = 'swiper-containers';
        let swiperContainers = 'swiper-containerss';
        let freeswiperContainers = 'free-swiper-container';
        let bannerSwiperContainers = 'bannerSwiperContainers';
        let props = this.props;
        let keys = props.selectorData;
        let defaultImg = DEFALUT_INFO.defaultImg;
        let tags = keys.map((selector, index) => {
            return (
                <Selector
                    key={index}
                    data={selector}
                    onclick={(k,subKey) => props.onSelectClick(k,subKey)}
                    isActivated={selector.key == props.currentSelector.key}
                />
            )
        });

        let chosentags = keys.filter(seletor => seletor.key == props.currentSelector.key);
        let subTags = '';
        if(chosentags && chosentags.length > 0){
            subTags = chosentags[0].subSelector.map((s,index)=>{
                return (
                    <li key={index} className={"subSelector font14 " + (s == props.currentSelector.subKey ? 'actived' : '')} onClick={(k,subKey) => props.onSelectClick(props.currentSelector.key,s)}>
                        {s}
                    </li>
                )
            })
        }

        let content = props.contentData;
        let freeItems = content.freeItems;
        // let domain = ENV.domain;
        let domain = "http://114.215.143.97";
        let frees = content.freeItems && content.freeItems.length > 0 ? freeItems.map((item,index)=>{
            return (
                <Link key={index} to={"/productDetail/"+props.storeData.id+"/"+item.skuNumber}>
                    <li className="freeItems">
                        {item.imagePath ?
                            <LazyLoad className="freeItemImg">
                                <img className="" src={domain + util.getMiddlePic(item.imagePath) } alt=""/>
                            </LazyLoad> :
                            <LazyLoad className="freeItemImg">
                                <img className="" src={defaultImg} alt=""/>
                            </LazyLoad>
                        }
                        <div className="freeItemText font14">{item.shortName}</div>
                    </li>
                </Link>
            )
        }) : null;
        // let arr = [];
        // arr.push(content.banner);
        let bannerInfo = content.banner ?
            <BannerContainer storeData={props.storeData} bannerData={content.banner} swiperClass={bannerSwiperContainers}/>
            : null;

        return (
            <div>
                <ul className="selectorContainer" onClick={this._onclick.bind(this)}>
                    <Swiper swiperConfig={swiperConfig} swiperContainer={swiperContainer}>
                        {tags}
                    </Swiper>
                </ul>
                {bannerInfo}
                <ul className={"selectorContainer freeitem " + (content.freeItems && content.freeItems.length ? "m02" : 'hide')}>
                    <Swiper swiperConfig={swiperConfigs1} swiperContainer={freeswiperContainers}>
                        {frees}
                    </Swiper>
                </ul>
                <ul className="selectorContainer sub">
                    <Swiper swiperConfig={swiperConfigs} swiperContainer={swiperContainers}>
                        {subTags}
                    </Swiper>
                </ul>
            </div>
        )
    }
}

SelectorContainer.PropTypes = {
    selectorData:React.PropTypes.Array,
    currentSelector:React.PropTypes.object,
    contentData:React.PropTypes.object,
    storeData:React.PropTypes.object,
};

SelectorContainer.defaultProps = {
    selectorData:[],
    currentSelector :{
        key : '',
        subKey : ''
    },
    contentData : {
        freeItems : [],
        banner : []
    },
    storeData : {
        id : 0
    }
};