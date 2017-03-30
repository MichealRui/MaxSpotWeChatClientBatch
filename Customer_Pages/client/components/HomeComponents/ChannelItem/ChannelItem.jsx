"use strict";

import React from 'react';
import {Link} from 'react-router';
import util from '../../../util/WeChatUtil'
require('./index.css');

export default class ChannelItem extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let props = this.props;
        let domain = ENV.domain;
        let defaultImg = DEFALUT_INFO.defaultImg
        return (
            <Link to={"/activity/" + props.channelData.type + '/' + props.storeId}>
                <div className="channelItem">
                    <div className="campaignItemImg">
                        {
                            props.channelData.imagePath ?
                                <img src={domain + util.getMiddlePic(props.channelData.imagePath)} alt=""/> :
                                <img src={defaultImg} alt=""/>
                        }

                    </div>
                    <div className={"campaignPost " + (props.channelData.type == 1 ? "newPost" : "hotPost")}>
                        {
                            props.channelData.type == 1 ?
                                <img src={require('./image/new.png')} alt=""/> :
                                <img src={require('./image/hot.png')} alt=""/>
                        }

                    </div>
                </div>
            </Link>
        )
    }
}

ChannelItem.PropTypes = {
    channelData : React.PropTypes.object,
    storeId : React.PropTypes.number,
};

ChannelItem.defaultProps = {
    channelData : {},
    storeId : 0
};
