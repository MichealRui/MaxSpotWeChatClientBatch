"use strict";
import React from 'react';
import {Link} from 'react-router';
import ChannelItem from '../ChannelItem/ChannelItem'
require('./index.css')

export default class CampaignContainer extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        let props = this.props;
        return (
            <div className="campaignContainer">
                {
                    props.channelData.map(
                        (channel,index) => {
                            return <ChannelItem key={index} channelData={channel} storeId={props.storeData.id}/>
                        }
                    )
                }
            </div>
        )
    }

}

CampaignContainer.PropTypes = {
    channelData : React.PropTypes.array,
    storeData : React.PropTypes.object
};
CampaignContainer.defaultProps = {
    channelData : [],
    storeData : {
        id:0
    }
}