'use strict';
require('./index.css');
import React from 'react';

export default class CampaignItem extends React.Component {
    constructor(props){
        super(props);
    }

    getAttr(attributes) {
        let def = <br></br>;
        var atts = def;
        if(attributes && attributes.length > 0) {
            atts = attributes.map(att => {
                if(att.value) {
                    return att.value + att.unit
                } else return ''
            }).reduce((pre, next) =>
            {
                if(pre == '' && next == '') {
                    return ''
                } else {
                    return pre + next + ' '
                }
            }, '')
        }
        if(atts == '') {
            atts=def
        }
        return atts
    }

    render(){
        let campaignItem = this.props.campaignItem;
        let tag = this.props.tag
        return (
            <div className="campaignItemContainer">
                <div className="pic">
                    <img src={campaignItem.imagePath}/>
                    <div className="picText font20">赠品</div>
                </div>
                <h3 className="proInfo font20">
                    <p>{campaignItem.brandName}</p>
                    <p>{campaignItem.shortName}</p>
                    <p className="font16">{this.getAttr(campaignItem.attributes)}</p>
                </h3>
                <div className="giftText font30">
                    <p className="font24">满100</p>
                    <p>享赠</p>
                </div>
            </div>
        );
    }
}

CampaignItem.propTypes={
    campaignItem:React.PropTypes.object
};

CampaignItem.defaultProps= {
    campaignItem:{}
};


