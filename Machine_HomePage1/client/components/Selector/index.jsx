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
            selectorKey:'food'
        }
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

    render() {
        let props = this.props;
        let keys = props.selector;
        let banners = props.bannerData;
        let channel = props.channelData;
        let channelHtml = channel ? channel.map(
            (cha,index)=>{
                return(
                    <div className={"activityItem activity "+(cha.type == 1 ? 'new ' : 'hot ') + (this.props.activeTag == ("channel"+cha.type) ? 'active':'')} key={index} onClick={()=>this.props.getChannelData(cha.type)}>
                        {
                            cha.type == 1 ? <img src={require('./images/new.png')} alt=""/> : <img src={require('./images/hot.png')} alt=""/>
                        }
                        <div className="line"></div>
                    </div>
                )
            }
        ) : null;
        let bannerHtml = banners ? banners.map((banner,index)=>{
            return (
                <div className={"activityItem activity "+ (this.props.activeTag == ("active"+banner.campaignId) ? 'active':'')} key={index} onClick={()=>this.props.getActivityData(banner.campaignId)}>
                    <img src={banner.imagePath} alt=""/>
                    <div className="line"></div>
                </div>
            )
        }) : null;
        let tag = keys.map(
            (sel,index)=>{
                return (
                    <div key={index} className={ "activityItem contentTag " + (props.currentSelector.key == sel.key ? 'active' : '')  }
                        onClick={
                            () => this.setSubSelector(sel)
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
        };
        return (
            <div className="activityTagsContainer">
                <div className="contentActivityTags">
                    <SwiperContainer
                        swiperConfig={swiperConfig}
                        swiperContainer={'swipers6'}
                        reload={true}
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