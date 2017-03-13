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
                <div className="image-container">
                    <img className="campaign-item-image" src={campaignItem.imagePath}/>
                    <span className="image-banner">赠品</span>
                </div>
                <div className="itemDesc">
                    <section className="brand desc font11">{campaignItem.brandName}</section>
                    <section className="name desc font14">{campaignItem.shortName}</section>
                    <section className="attr desc font10">{this.getAttr(campaignItem.attributes)}</section>
                </div>
                <div className="coupon font18">
                    {'满100'}
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


