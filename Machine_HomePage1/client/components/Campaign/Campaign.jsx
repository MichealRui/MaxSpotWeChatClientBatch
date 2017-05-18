'use strict';
require('./index.css');
import React from 'react';
import CampaignItem from '../CampaignItem/CampaignItem'
export default class Campaign extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let campaign = this.props.campaign;
        return campaign  == Campaign.defaultProps.campaign ? null : (
            <div className="campaignInfo">
                <div className="campaignTagList">
                    <div className="campaignTag font26">
                        {campaign.campaignTag}
                    </div>
                    {
                        campaign.item ?
                            <CampaignItem campaignItem={campaign.sku} tag={campaign.campaignTag}/>
                            :
                            null
                    }
                </div>
            </div>
        )
    }
}

Campaign.propTypes={
    campaign:React.PropTypes.object
};

Campaign.defaultProps= {
    campaign:{
        campaignId:-1,
        campaignTag:'',
        item:{
            brandName:'',
            shortName:'',
            imagePath:'',
            attributes:[
                {}
            ]
        }
    }
};


