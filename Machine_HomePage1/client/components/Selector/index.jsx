'use strict';
import React from 'react';
import SubSelector from '../../components/ButtonSelector/ButtonSelector'
import SwiperContainer from '../../components/Swiper/index'
require ('./index.css');

export default class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selector:[],
            selectorKey:'food',
            first:true,

        };
        this._newType = 1;
        this._activeType = 2;
        this._selectType = 3;
    }

    setSubSelector(selector) {
        // this.setState({
        //     selector: selector,
        //     selectorKey:selector.key
        // });
        this.props.changeContent(selector.key, selector.subSelector[0])
    }

    // componentWillReceiveProps(nextProps) {
    //     // Bad Hack
    //     if(this.state.selector.length == 0) {
    //         this.setState({
    //             selector: nextProps.selector[0]
    //         })
    //     }
    // }

    click(type,info){
        if(type == this._newType){
            //新品特惠
            this.props.getChannelData(info)
        }else if(type == this._activeType){
            //活动
            this.props.getActivityData(info)
        }else if(type == this._selectType){
            //select
            this.setSubSelector(info)
        }
        this.setState({
            first : false
        })
    }

    render() {
        let props = this.props;
        let keys = props.selector;
        let banners = props.bannerData;
        let channel = props.channelData;
        let domain= IMAGECONFIG.host;
        domain = 'http://test.mjitech.com/';
        let channelHtml = channel ? channel.map(
            (cha,index)=>{
                return(
                    <div className={"activityItem activity "+(cha.type == 1 ? 'new ' : 'hot ') + (this.props.activeTag == ("channel"+cha.type) ? 'active':'')} key={index} onClick={()=>this.click.bind(this)(this._newType,cha.type)}>
                        {
                            cha.type == 1 ? <img src={require('./images/new.png')} alt=""/> : <img src={require('./images/hot.png')} alt=""/>
                        }
                        <div className="line"></div>
                    </div>
                )
            }
        ) : null;
        //domain + banner.imagePath
        let bannerHtml = banners ? banners.map((banner,index)=>{
            return (
                <div className={"activityItem activity "+ (this.props.activeTag == ("active"+banner.campaignId) ? 'active':'')} key={index} onClick={()=>this.click.bind(this)(this._activeType,banner.campaignId)}>
                    <img src={require('./images/1.png')} alt=""/>
                    <div className="line"></div>
                </div>
            )
        }) : null;
        let tag = keys.map(
            (sel,index)=>{
                return (
                    <div key={index} className={ "activityItem contentTag " + (props.currentSelector.key == sel.key ? 'active' : '')  }
                        onClick={
                            ()=>this.click.bind(this)(this._selectType,sel)
                        }
                    >
                        <img src={sel.image} />
                        <div className="contentText font18">{sel.content}</div>
                        <div className="line"></div>
                    </div>
                )
            }
        );
        let all = new Array;
        all.push(channelHtml);
        all.push(bannerHtml);
        all.push(tag);
        let swiperConfig = {
            freeMode: false,
            slidesPerView: 7,
            slideToClickedSlide:true,
        };
        /*
         pagination:'',
         freeMode: false,
         slidesPerView: length,
         spaceBetween: 0,
         */
        return (
            <div className="activityTagsContainer">
                <div className="contentActivityTags">
                    <SwiperContainer
                        swiperConfig={swiperConfig}
                        swiperContainer={'swipers6'}
                        reload={this.state.first}
                    >
                        {all}
                    </SwiperContainer>
                </div>
                <SubSelector selector={props.currentSelector}
                             changeContent={this.props.changeContent}
                             isActivity={props.isActivity}
                />

            </div>
        )
    }
}